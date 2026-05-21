import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { SOLUTIONS, USE_CASES, PILLARS, PC_BUILDS, SUPPORT_PLANS } from '@/data/services';
import { testimonialsData } from '@/data/testimonials';

const MAX_BODY_SIZE = 50 * 1024; // 50 KB limit
const MAX_RATE_ENTRIES = 10000; // Límite para evitar memory leak

async function loadPricing() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'pricing.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content || '{}');
    if (data && Object.keys(data).length > 0) return data;
    return null;
  } catch (e) {
    return null;
  }
}

function buildKnowledgeBase() {
  const servicesBlock = Object.entries(SOLUTIONS).map(([cat, items]) => {
    const pillar = PILLARS.find(p => p.id === cat);
    const catName = pillar?.labelEs || cat;
    const itemsText = items.map(s =>
      `  • ${s.titleEs}: ${s.descEs} | Incluye: ${s.includesEs.join(', ')}. | Resultado: ${s.outcomeEs} | Tiempo estimado: ${s.timelineEs}`
    ).join('\n');
    return `${catName}:\n${itemsText}`;
  }).join('\n\n');

  const useCasesBlock = USE_CASES.map(u =>
    `  • ${u.titleEs}: Problema: ${u.problemEs} → Solución: ${u.solutionEs} → Resultado esperado: ${u.resultEs}`
  ).join('\n');

  const testimonialsBlock = testimonialsData.map(t =>
    `  • "${t.content}" — ${t.name}, ${t.role}`
  ).join('\n');

  const pcBuildsBlock = PC_BUILDS.map(b =>
    `  • ${b.name} (${b.price}): ${b.tag}. Componentes: ${b.components.join(', ')}.`
  ).join('\n');

  const supportPlansBlock = SUPPORT_PLANS.map(p =>
    `  • ${p.name} (${p.badge}): ${p.price}${p.priceNote ? ' ' + p.priceNote : ''} — ${p.priceSub}. ${p.desc} Incluye: ${p.features.map(f => f.label).join(', ')}. Resultado: ${p.outcome}. CTA: "${p.cta}".`
  ).join('\n')

  return `SERVICIOS DETALLADOS:\n${servicesBlock}\n\nCASOS DE USO POR SECTOR:\n${useCasesBlock}\n\nCONFIGURACIONES DE PC (precios en USD, pago en pesos al cambio del día):\n${pcBuildsBlock}\n\nPLANES DE SOPORTE MENSUAL (precios en ARS):\n${supportPlansBlock}\n\nTESTIMONIOS DE CLIENTES:\n${testimonialsBlock}`;
}

// Detecta si el JSON de precios contiene montos oficiales (en ARS/USD u otra moneda)
function containsPriceNumbers(obj) {
  if (!obj || typeof obj !== 'object') return false;

  const currencyLike = /(\bprice\b|\bprecio\b|\bfrom\b|\bdesde\b|ars|usd|u\$s|\$)/i;
  const currencyPattern = /(\$\s?\d|\bARS\b|\bUSD\b|\bU\$S\b|\b\d{1,3}(?:[\.\s]\d{3})*(?:[,\.]\d+)?\s*(?:pesos|usd|d[oó]lares)|\d+\.?\d*\s*(?:k|mil)\b)/i;

  const stack = [obj];
  while (stack.length) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      for (const item of current) stack.push(item);
      continue;
    }
    if (current && typeof current === 'object') {
      for (const [key, value] of Object.entries(current)) {
        // Si la clave sugiere que es un campo de precio y el valor es numérico (>0)
        if (currencyLike.test(key) && typeof value === 'number' && isFinite(value) && value > 0) {
          return true;
        }
        // Si la clave sugiere precio y es string con patrón de moneda
        if (currencyLike.test(key) && typeof value === 'string' && currencyPattern.test(value)) {
          return true;
        }
        // Si el valor en sí es string con patrón de moneda
        if (typeof value === 'string' && currencyPattern.test(value)) {
          return true;
        }
        // Recursión
        if (value && (typeof value === 'object')) stack.push(value);
      }
    }
  }
  return false;
}

export async function POST(req) {
  try {
    // Limitar tamaño del body
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Solicitud demasiado grande' },
        { status: 413 }
      );
    }

    const { message, history, page } = await req.json();

    if (!message && (!history || history.length === 0)) {
      return NextResponse.json(
        { error: 'Mensaje es requerido' },
        { status: 400 }
      );
    }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // ej: https://tudominio.com

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 }
      );
    }

    // Verificación opcional de origen (mitiga consumo desde sitios externos)
    const reqOrigin = req.headers.get('origin') || '';
    if (ALLOWED_ORIGIN && reqOrigin && !reqOrigin.startsWith(ALLOWED_ORIGIN)) {
      return NextResponse.json(
        { error: 'Origen no permitido' },
        { status: 403 }
      );
    }

    // Gestión de sesión vía cookie para memoria y rate limit (fallback)
  const cookieStore = await cookies();
    let sessionId = cookieStore.get('dsw_chat_sid')?.value;
    const isNewSession = !sessionId;
    if (!sessionId) {
      // Usar counter sequencial en lugar de UUID aleatorio para mejor rate limiting
      globalThis.__DSW_CHAT_COUNTER__ = (globalThis.__DSW_CHAT_COUNTER__ || 0) + 1;
      sessionId = `guest-${globalThis.__DSW_CHAT_COUNTER__}-${Date.now()}`;
    }

    // Obtener IP del cliente (mejor esfuerzo)
    const xff = req.headers.get('x-forwarded-for');
    const ip = (xff?.split(',')[0]?.trim())
      || req.headers.get('x-real-ip')
      || 'unknown-ip';

    // Rate limiting y cooldown en memoria (para producción usar Redis/KV)
    const RATE_STORE_KEY = '__DSW_CHAT_RATE__';
    globalThis[RATE_STORE_KEY] = globalThis[RATE_STORE_KEY] || new Map();
    const rateStore = globalThis[RATE_STORE_KEY];

    // Limpiar entradas expiradas del rate store
    const now = Date.now();
    for (const [key, rec] of rateStore.entries()) {
      if (now > rec.resetAt + 60000) { // Limpiar 1 min después de expirar
        rateStore.delete(key);
      }
    }
    // Límite de emergencia si algo sale mal
    if (rateStore.size > MAX_RATE_ENTRIES) {
      rateStore.clear();
    }

    function checkAndInc(key, max, windowMs) {
      const now = Date.now();
      const rec = rateStore.get(key) || { count: 0, resetAt: now + windowMs, lastTs: 0 };
      if (now > rec.resetAt) {
        rec.count = 0;
        rec.resetAt = now + windowMs;
      }
      rec.count += 1;
      rec.lastTs = now;
      rateStore.set(key, rec);
      return { over: rec.count > max, rec };
    }

    function peek(key) {
      return rateStore.get(key);
    }

    // Límites: por IP y por sesión
    const PER_IP_MAX = 20; // 20 req / 5 min
    const PER_IP_WIN = 5 * 60 * 1000;
    const PER_SESS_MAX = 12; // 12 req / 5 min por sesión
    const PER_SESS_WIN = 5 * 60 * 1000;
    const MIN_INTERVAL_MS = 1500; // 1.5s entre req de una misma sesión

    const ipKey = `ip:${ip}`;
    const sessKey = `sess:${sessionId}`;

    // Cooldown (peek sin incrementar)
    const sessRec = peek(sessKey);
    if (sessRec && Date.now() - (sessRec.lastTs || 0) < MIN_INTERVAL_MS) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes seguidas. Intenta nuevamente en un momento.' },
        { status: 429 }
      );
    }

    const ipRes = checkAndInc(ipKey, PER_IP_MAX, PER_IP_WIN);
    if (ipRes.over) {
      return NextResponse.json(
        { error: 'Límite de solicitudes por IP alcanzado temporalmente.' },
        { status: 429 }
      );
    }

    const sessRes = checkAndInc(sessKey, PER_SESS_MAX, PER_SESS_WIN);
    if (sessRes.over) {
      return NextResponse.json(
        { error: 'Límite de solicitudes por sesión alcanzado temporalmente.' },
        { status: 429 }
      );
    }

    // Memoria en proceso (nota: en serverless puede reiniciarse)
    const globalKey = '__DSW_CHAT_STORE__';
    globalThis[globalKey] = globalThis[globalKey] || new Map();
    const store = globalThis[globalKey];

    // Limpiar sesiones antiguas (>4 horas)
    const maxStoreSize = 1000;
    if (store.size > maxStoreSize) {
      const entriesToDelete = Array.from(store.entries())
        .sort((a, b) => (a[1].lastAccess || 0) - (b[1].lastAccess || 0))
        .slice(0, maxStoreSize * 0.2);
      entriesToDelete.forEach(([key]) => store.delete(key));
    }

    const serverHistory = (store.get(sessionId)?.history || []);

    // Cargar datos oficiales de precios (si existen)
    const pricingData = await loadPricing();

    // Construir mensajes: system + (datos oficiales si existen) + historial (cliente o servidor) + último mensaje
    const systemMessage = {
      role: 'system',
      content: `Eres Linguo, el asistente virtual de Digital Solutions Web (DSW), empresa tecnológica ubicada en Formosa, Argentina que trabaja de forma remota con clientes de toda Latinoamérica.

${buildKnowledgeBase()}

CONTACTO:
   - WhatsApp: botón verde flotante en la web.
   - Formulario de contacto en la sección /contacto.
   - Email: digitalsolutionsweb3.0@gmail.com

INSTRUCCIONES:
- Solo respondé preguntas sobre DSW, sus servicios, precios, contacto o información de la empresa.
- Si preguntan algo ajeno a DSW, responde de manera neutral y educada.
- Política de precios: solo mencioná precios si están en este contexto o en los "Datos oficiales de precios" del sistema. No inventes cifras. Si no tenés el dato exacto, ofrecé cotización personalizada por WhatsApp o email.
- Sé conciso y amigable con algo de humor simpson. Respuestas breves y directas.`,
    };
    const pricingSystemMessage = pricingData
      ? {
          role: 'system',
          content: `Datos oficiales de precios (JSON): ${JSON.stringify(pricingData)}`,
        }
      : null;

  // Normalizar historial entrante (opcional). Si no llega, usar el del servidor
    const baseHistory = Array.isArray(history) ? history : serverHistory;
    const normalizedHistory = Array.isArray(baseHistory)
      ? baseHistory
          .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .map(m => ({ role: m.role, content: m.content }))
      : [];

    if (message) {
      normalizedHistory.push({ role: 'user', content: message });
    }

    // Validación de tamaño del input del usuario
    const lastUserMsg = [...normalizedHistory].reverse().find(m => m.role === 'user');
    if (lastUserMsg && lastUserMsg.content && lastUserMsg.content.length > 700) {
      return NextResponse.json(
        { error: 'Tu mensaje es muy largo. Por favor, se específico (máximo 700 caracteres).' },
        { status: 413 }
      );
    }

    // Límite simple por cantidad para evitar prompts muy largos (mantener los últimos N turnos)
    const MAX_TURNS = 8; // user/assistant mensajes, sin contar system
    const trimmedHistory = normalizedHistory.slice(-MAX_TURNS);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...(pricingSystemMessage ? [pricingSystemMessage] : []), ...trimmedHistory],
        max_tokens: 150,
        temperature: 0.7,
        store: true,
        metadata: {
          source: 'web-chat',
          app: 'digital-solutions-web',
          ...(page ? { page } : {}),
        },
      }),
    });

  const data = await response.json();

    if (!response.ok) {
      console.error('Error de OpenAI:', data);
      return NextResponse.json(
        { error: 'Error al procesar la solicitud' },
        { status: response.status }
      );
    }

  let answer = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';

    // Post-procesamiento para evitar montos si el usuario pidió precios
    const priceIntentRegex = /(precio|precios|costo|cu[áa]nto sale|cu[áa]nto cuesta|tarifa|valor|presupuesto)/i;
    const currencyLeakRegex = /(\$\s?\d|\bARS\b|\bUSD\b|\bU\$S\b|\b\d{1,3}(?:[\.\s]\d{3})*(?:[,\.]\d+)?\s*(?:pesos|usd|d[oó]lares)|\d+\.?\d*\s*(?:k|mil)\b)/i;
    if (lastUserMsg && priceIntentRegex.test(lastUserMsg.content)) {
      const hasOfficialPrices = containsPriceNumbers(pricingData);
      if (!hasOfficialPrices && currencyLeakRegex.test(answer)) {
        // No hay datos oficiales: evita números inventados
        answer = 'Nuestros precios son personalizados según el alcance y la complejidad del proyecto. Para una cotización precisa, contáctanos por WhatsApp o al email digitalsolutionsweb3.0@gmail.com y con gusto te asesoramos.';
      }
      // Si hay datos oficiales, permitimos que el modelo use esos números, pero podemos añadir un disclaimer/CTA
      if ((pricingData?.whatsapp || pricingData?.email)) {
        const cta = `\n\nPara avanzar, puedes escribirnos por WhatsApp${pricingData.whatsapp ? `: ${pricingData.whatsapp}` : ''}${pricingData.email ? ` o por email: ${pricingData.email}` : ''}.`;
        if (!answer.includes('WhatsApp') && !answer.includes('email')) {
          answer += cta;
        }
      }
    }

    // Actualizar memoria del servidor con la nueva respuesta
  const updatedHistory = [...trimmedHistory, { role: 'assistant', content: answer }];
    store.set(sessionId, { history: updatedHistory, lastAccess: Date.now() });

    // Responder y fijar cookie de sesión si corresponde
    const res = NextResponse.json({ answer });
    if (isNewSession) {
      res.cookies.set('dsw_chat_sid', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2, // 2 horas
      });
    }
    return res;
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
