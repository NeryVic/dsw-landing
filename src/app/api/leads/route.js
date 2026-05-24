import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_TYPES = new Set(['sistema', 'web', 'soporte', 'otro'])
const MAX_BODY_SIZE = 20 * 1024
const MIN_FORM_FILL_MS = 2500
const IP_COOLDOWN_MS = 8000
const IP_WINDOW_MS = 10 * 60 * 1000
const IP_MAX_PER_WINDOW = 10
const EMAIL_WINDOW_MS = 60 * 60 * 1000
const EMAIL_MAX_PER_WINDOW = 5

const sanitize = (value, maxLength = 500) => {
  if (!value || typeof value !== 'string') return ''
  return value
    .trim()
    .substring(0, maxLength)
    .replace(/[<>`]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ')
}

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const getIp = (request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  || request.headers.get('x-real-ip')
  || 'unknown-ip'

const MAILER_KEY = '__DSW_LEADS_MAILER__'
const RATE_KEY = '__DSW_LEADS_RATE__'

const getTransporter = () => {
  if (globalThis[MAILER_KEY]) return globalThis[MAILER_KEY]

  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    return null
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  globalThis[MAILER_KEY] = transporter
  return transporter
}

const getRateStore = () => {
  globalThis[RATE_KEY] = globalThis[RATE_KEY] || new Map()
  return globalThis[RATE_KEY]
}

const cleanupRateStore = (store) => {
  const now = Date.now()
  for (const [key, rec] of store.entries()) {
    if (!rec || now > rec.resetAt + 5 * 60 * 1000) {
      store.delete(key)
    }
  }

  if (store.size > 5000) {
    const oldest = Array.from(store.entries())
      .sort((a, b) => (a[1]?.lastTs || 0) - (b[1]?.lastTs || 0))
      .slice(0, 1500)
    oldest.forEach(([key]) => store.delete(key))
  }
}

const checkWindowLimit = (store, key, max, windowMs) => {
  const now = Date.now()
  const rec = store.get(key) || { count: 0, resetAt: now + windowMs, lastTs: 0 }

  if (now > rec.resetAt) {
    rec.count = 0
    rec.resetAt = now + windowMs
  }

  rec.count += 1
  rec.lastTs = now
  store.set(key, rec)

  return rec.count <= max
}

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || '0')
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Solicitud demasiado grande.' }, { status: 413 })
    }

    const allowedOrigin = process.env.ALLOWED_ORIGIN
    const reqOrigin = request.headers.get('origin') || ''
    if (allowedOrigin && reqOrigin && !reqOrigin.startsWith(allowedOrigin)) {
      return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 })
    }

    const body = await request.json()

    const name = sanitize(body?.name, 100)
    const company = sanitize(body?.company, 120)
    const email = sanitize(body?.email, 254)
    const problem = sanitize(body?.problem || body?.message, 1200)
    const source = sanitize(body?.source, 60) || 'web-form'
    const type = sanitize(body?.type, 20)
    const website = sanitize(body?.website, 80)
    const formStartedAt = Number(body?.formStartedAt || 0)

    // Honeypot: si viene lleno, responder ok silencioso para bots.
    if (website) {
      return NextResponse.json({ ok: true })
    }

    if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json({ error: 'No pudimos validar el envio. Intenta de nuevo.' }, { status: 429 })
    }

    if (!name || !email || !problem) {
      return NextResponse.json({ error: 'Completa todos los campos obligatorios.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Email invalido.' }, { status: 400 })
    }

    if (type && !ALLOWED_TYPES.has(type)) {
      return NextResponse.json({ error: 'Tipo de consulta invalido.' }, { status: 400 })
    }

    const ip = getIp(request)
    const rateStore = getRateStore()
    cleanupRateStore(rateStore)

    const ipCooldownKey = `ip-cooldown:${ip}`
    const now = Date.now()
    const lastHit = rateStore.get(ipCooldownKey)
    if (lastHit && now - (lastHit.lastTs || 0) < IP_COOLDOWN_MS) {
      return NextResponse.json({ error: 'Espera unos segundos antes de reenviar.' }, { status: 429 })
    }
    rateStore.set(ipCooldownKey, { lastTs: now, resetAt: now + IP_COOLDOWN_MS, count: 1 })

    const ipWindowOk = checkWindowLimit(rateStore, `ip-window:${ip}`, IP_MAX_PER_WINDOW, IP_WINDOW_MS)
    if (!ipWindowOk) {
      return NextResponse.json({ error: 'Demasiados intentos desde esta red. Intenta mas tarde.' }, { status: 429 })
    }

    const emailWindowOk = checkWindowLimit(rateStore, `email-window:${email.toLowerCase()}`, EMAIL_MAX_PER_WINDOW, EMAIL_WINDOW_MS)
    if (!emailWindowOk) {
      return NextResponse.json({ error: 'Este email supero el limite por hora. Intenta mas tarde.' }, { status: 429 })
    }

    const STORE_KEY = '__DSW_LEADS_STORE__'
    globalThis[STORE_KEY] = globalThis[STORE_KEY] || []
    const leads = globalThis[STORE_KEY]

    leads.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      source,
      type,
      name,
      company,
      email,
      problem,
      ip,
    })

    if (leads.length > 500) {
      leads.splice(0, leads.length - 500)
    }

   /*  console.info('[Lead Capturado]', {
      createdAt: new Date().toISOString(),
      source,
      type,
      name,
      company,
      email,
      ip,
    }) */

    const transporter = getTransporter()
    const to = process.env.LEADS_TO_EMAIL || process.env.GMAIL_USER
    const from = process.env.LEADS_FROM_EMAIL || process.env.GMAIL_USER

    if (!transporter || !to || !from) {
      return NextResponse.json(
        { error: 'Falta configurar el envio de emails en el servidor.' },
        { status: 500 }
      )
    }

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Nuevo lead: ${company || 'Sin empresa'} - ${source}`,
      text: [
        `Nuevo lead desde: ${source}`,
        '',
        `Nombre: ${name}`,
        `Empresa: ${company || '-'}`,
        `Email: ${email}`,
        `Tipo: ${type || '-'}`,
        `Problema: ${problem}`,
      ].join('\n'),
      html: `
        <h2>Nuevo lead desde: ${escapeHtml(source)}</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(company || '-')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(type || '-')}</p>
        <p><strong>Problema:</strong> ${escapeHtml(problem)}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'No pudimos procesar tu solicitud.' }, { status: 500 })
  }
}
