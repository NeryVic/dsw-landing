import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

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
    const { message, history } = await req.json();

    if (!message && (!history || history.length === 0)) {
      return NextResponse.json(
        { error: 'Mensaje es requerido' },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 }
      );
    }

    // Gestión de sesión vía cookie para memoria en servidor (fallback)
  const cookieStore = await cookies();
    let sessionId = cookieStore.get('dsw_chat_sid')?.value;
    const isNewSession = !sessionId;
    if (!sessionId) {
      sessionId = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
    }

    // Memoria en proceso (nota: en serverless puede reiniciarse)
    const globalKey = '__DSW_CHAT_STORE__';
    globalThis[globalKey] = globalThis[globalKey] || new Map();
    const store = globalThis[globalKey];
    const serverHistory = store.get(sessionId) || [];

    // Cargar datos oficiales de precios (si existen)
    const pricingData = await loadPricing();

    // Construir mensajes: system + (datos oficiales si existen) + historial (cliente o servidor) + último mensaje
    const systemMessage = {
      role: 'system',
      content:
        'Eres un asistente virtual amigable para Digital Solutions Web (DSW), una empresa de desarrollo web ubicada en Formosa, Argentina. Ayudas a los clientes con información sobre servicios (desarrollo web, diseño UI/UX, sistemas POS, ecommerce, sistemas de reservas), precios, contacto y ubicación. Sé conciso y amigable. Política de precios: Solo puedes mencionar precios si aparecen en los "Datos oficiales de precios" provistos por el sistema. Si no encuentras el precio solicitado en esos datos, no inventes cifras y ofrece una cotización personalizada pidiendo que nos contacten por WhatsApp o por email a digitalsolutionsweb3.0@gmail.com. Nunca uses otras fuentes para precios.',
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

    // Límite simple por cantidad para evitar prompts muy largos (mantener los últimos 12 turnos)
    const MAX_TURNS = 8; // user/assistant mensajes, sin contar system
    const trimmedHistory = normalizedHistory.slice(-MAX_TURNS);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Versión optimizada para chat
        messages: [systemMessage, ...(pricingSystemMessage ? [pricingSystemMessage] : []), ...trimmedHistory],
        max_tokens: 150,
        temperature: 0.7,
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
    const lastUserMsg = [...trimmedHistory].reverse().find(m => m.role === 'user');
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
    store.set(sessionId, updatedHistory);

    // Responder y fijar cookie de sesión si corresponde
    const res = NextResponse.json({ answer });
    if (isNewSession) {
      res.cookies.set('dsw_chat_sid', sessionId, {
        httpOnly: false,
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
