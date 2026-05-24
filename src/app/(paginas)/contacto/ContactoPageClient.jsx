'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants'
import { useWssp } from '@/hooks/wssp'

const sanitizeInput = (input, maxLength = 500) => {
  if (!input || typeof input !== 'string') return '';

  return String(input)
    .trim()
    .substring(0, maxLength)
    .replace(/[\n\r\t]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
};

const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const ALLOWED_TYPES = ['sistema', 'web', 'soporte', 'otro'];

export default function ContactoPageClient() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const cardsRef = useRef(null)
  const formStartedAtRef = useRef(Date.now())

  const [formData, setFormData] = useState({ name: '', company: '', email: '', type: '', message: '', website: '' })
  const [formSent, setFormSent] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [lastSubmitTime, setLastSubmitTime] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const RATE_LIMIT_MS = 3000;
  const MAX_NAME_LENGTH = 100;
  const MAX_COMPANY_LENGTH = 100;
  const MAX_EMAIL_LENGTH = 254;
  const MAX_MESSAGE_LENGTH = 2000;

  useEffect(() => {
    let ctx
    async function setup() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.contact-header-reveal',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        )

        const cards = gsap.utils.toArray('.contact-card')
        if (cards.length && cardsRef.current) {
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 32, scale: 0.97 },
            {
              autoAlpha: 1, y: 0, scale: 1,
              duration: 0.65, stagger: 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
            }
          )

          cards.forEach(card => {
            const icons = card.querySelectorAll('.contact-icon')
            card.addEventListener('mouseenter', () => {
              gsap.to(card, { y: -2, duration: 0.22, ease: 'power2.out', force3D: false })
              icons.forEach(icon => gsap.to(icon, { scale: 1.2, rotate: -5, duration: 0.22, ease: 'back.out(2)' }))
            })
            card.addEventListener('mouseleave', () => {
              gsap.to(card, { y: 0, duration: 0.28, ease: 'power2.inOut', force3D: false })
              icons.forEach(icon => gsap.to(icon, { scale: 1, rotate: 0, duration: 0.24, ease: 'power2.inOut' }))
            })
          })
        }

        ScrollTrigger.refresh()
      })
    }
    setup()
    return () => ctx?.revert()
  }, [])

  const handleContact = () => {
    const message = language === 'es'
      ? 'Hola, quiero conversar sobre un proyecto. ¿Podemos coordinar una reunión inicial?'
      : 'Hi, I want to discuss a project. Can we schedule an initial meeting?'
    openWhatsApp(undefined, message)
  }

  const resetForm = () => {
    setFormData({ name: '', company: '', email: '', type: '', message: '', website: '' })
    setFormErrors({})
    setFormSent(false)
    formStartedAtRef.current = Date.now()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const now = Date.now()
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setFormErrors({ general: language === 'es' ? 'Por favor espera unos segundos antes de enviar otro mensaje' : 'Please wait a few seconds before sending another message' })
      return
    }

    setIsSubmitting(true)
    const newErrors = {}

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = language === 'es' ? 'El nombre es requerido' : 'Name is required'
    } else if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = `${language === 'es' ? 'Máximo' : 'Maximum'} ${MAX_NAME_LENGTH} ${language === 'es' ? 'caracteres' : 'characters'}`
    }

    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = language === 'es' ? 'El email es requerido' : 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = language === 'es' ? 'Email inválido' : 'Invalid email'
    }

    if (formData.company && formData.company.length > MAX_COMPANY_LENGTH) {
      newErrors.company = `${language === 'es' ? 'Máximo' : 'Maximum'} ${MAX_COMPANY_LENGTH} ${language === 'es' ? 'caracteres' : 'characters'}`
    }

    if (!formData.message || formData.message.trim().length === 0) {
      newErrors.message = language === 'es' ? 'El mensaje es requerido' : 'Message is required'
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `${language === 'es' ? 'Máximo' : 'Maximum'} ${MAX_MESSAGE_LENGTH} ${language === 'es' ? 'caracteres' : 'characters'}`
    }

    if (formData.type && !ALLOWED_TYPES.includes(formData.type)) {
      newErrors.type = language === 'es' ? 'Tipo de consulta inválido' : 'Invalid inquiry type'
    }

    setFormErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false)
      return
    }

    if (formData.website && formData.website.trim().length > 0) {
      setIsSubmitting(false)
      setFormSent(true)
      return
    }

    const sanitizedName = sanitizeInput(formData.name, MAX_NAME_LENGTH)
    const sanitizedCompany = sanitizeInput(formData.company, MAX_COMPANY_LENGTH)
    const sanitizedEmail = sanitizeInput(formData.email, MAX_EMAIL_LENGTH)
    const sanitizedMessage = sanitizeInput(formData.message, MAX_MESSAGE_LENGTH)
    const sanitizedType = sanitizeInput(formData.type, 20)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedName,
          company: sanitizedCompany,
          email: sanitizedEmail,
          type: sanitizedType,
          problem: sanitizedMessage,
          source: 'contacto-page',
          website: formData.website,
          formStartedAt: formStartedAtRef.current,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || (language === 'es' ? 'No pudimos enviar tu consulta.' : 'Could not send your inquiry.'))
      }

      setLastSubmitTime(now)
      setFormSent(true)
      setFormData({ name: '', company: '', email: '', type: '', message: '', website: '' })
      setFormErrors({})
      formStartedAtRef.current = Date.now()
    } catch (error) {
      setFormErrors({ general: error?.message || (language === 'es' ? 'No pudimos enviar tu consulta.' : 'Could not send your inquiry.') })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed'
  const labelClass = 'block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide'
  const errorClass = 'text-xs text-red-600 dark:text-red-400 mt-1'

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-14">
          <h1 className="contact-header-reveal opacity-0 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t('contact_page_title', 'Hablemos de tu Proyecto', 'Let\'s Talk About Your Project')}
          </h1>
          <p className="contact-header-reveal opacity-0 text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t('contact_page_intro', 'Contanos tu situación actual y te proponemos una solución concreta según tus objetivos y presupuesto.', 'Tell us your current situation and we will propose a concrete solution according to your goals and budget.')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-5">
              {t('contact_page_data_title', 'Canales directos', 'Direct channels')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="contact-icon w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 shrink-0">
                  <i className="ri-mail-line text-base text-blue-600 dark:text-blue-400"></i>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="contact-icon w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 shrink-0">
                  <i className="ri-phone-line text-base text-blue-600 dark:text-blue-400"></i>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="contact-icon w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 shrink-0">
                  <i className="ri-map-pin-line text-base text-blue-600 dark:text-blue-400"></i>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </article>

          <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              {t('contact_page_cta_title', 'Agendemos una charla breve', 'Let us schedule a short call')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {t('contact_page_cta_desc', 'En una primera conversación podemos definir prioridades, alcance inicial y próximos pasos.', 'In a first conversation we can define priorities, initial scope, and next steps.')}
            </p>
            <Button onClick={handleContact} size="lg">
              {t('contact_page_cta_btn', 'Escribir por WhatsApp', 'Message on WhatsApp')}
            </Button>
          </article>
        </div>

        <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {t('contact_form_title', 'Envianos un mensaje', 'Send us a message')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {t('contact_form_subtitle', 'Completá el formulario y te respondemos por email en menos de 24 horas.', 'Fill out the form and we will reply by email within 24 hours.')}
          </p>

          {formSent ? (
            <div className="flex flex-col items-center py-10 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/40 flex items-center justify-center border border-green-200 dark:border-green-900/40">
                <i className="ri-check-line text-2xl text-green-600 dark:text-green-400"></i>
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t('contact_form_sent_title', '¡Mensaje enviado!', 'Message sent!')}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                {t('contact_form_sent_desc', 'Tu consulta fue enviada correctamente. Te respondemos a la brevedad por email.', 'Your inquiry was sent successfully. We will reply soon by email.')}
              </p>
              <button onClick={resetForm} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {t('contact_form_send_another', 'Enviar otra consulta', 'Send another inquiry')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input type="text" name="website" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {formErrors.general && (
                <div className="sm:col-span-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{formErrors.general}</p>
                </div>
              )}

              <div>
                <label className={labelClass}>{t('contact_form_name', 'Nombre *', 'Name *')}</label>
                <input type="text" required disabled={isSubmitting} maxLength={MAX_NAME_LENGTH} value={formData.name} onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); if (formErrors.name) setFormErrors(p => ({ ...p, name: '' })) }} placeholder={t('contact_form_name_ph', 'Tu nombre', 'Your name')} className={inputClass} />
                {formErrors.name && <p className={errorClass}>{formErrors.name}</p>}
                <p className="text-xs text-slate-400 mt-1">{formData.name.length}/{MAX_NAME_LENGTH}</p>
              </div>

              <div>
                <label className={labelClass}>{t('contact_form_company', 'Empresa', 'Company')}</label>
                <input type="text" disabled={isSubmitting} maxLength={MAX_COMPANY_LENGTH} value={formData.company} onChange={e => { setFormData(p => ({ ...p, company: e.target.value })); if (formErrors.company) setFormErrors(p => ({ ...p, company: '' })) }} placeholder={t('contact_form_company_ph', 'Nombre de tu empresa (opcional)', 'Company name (optional)')} className={inputClass} />
                {formErrors.company && <p className={errorClass}>{formErrors.company}</p>}
                <p className="text-xs text-slate-400 mt-1">{formData.company.length}/{MAX_COMPANY_LENGTH}</p>
              </div>

              <div>
                <label className={labelClass}>{t('contact_form_email', 'Email *', 'Email *')}</label>
                <input type="email" required disabled={isSubmitting} maxLength={MAX_EMAIL_LENGTH} value={formData.email} onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); if (formErrors.email) setFormErrors(p => ({ ...p, email: '' })) }} placeholder={t('contact_form_email_ph', 'tu@email.com', 'you@email.com')} className={inputClass} />
                {formErrors.email && <p className={errorClass}>{formErrors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>{t('contact_form_type', 'Consulta sobre', 'Regarding')}</label>
                <select disabled={isSubmitting} value={formData.type} onChange={e => { setFormData(p => ({ ...p, type: e.target.value })); if (formErrors.type) setFormErrors(p => ({ ...p, type: '' })) }} className={inputClass}>
                  <option value="">{t('contact_form_type_default', 'Seleccioná una opción', 'Select an option')}</option>
                  <option value="sistema">{t('contact_form_type_sistema', 'Sistema a medida', 'Custom system')}</option>
                  <option value="web">{t('contact_form_type_web', 'Sitio web / Landing', 'Website / Landing')}</option>
                  <option value="soporte">{t('contact_form_type_soporte', 'Soporte técnico', 'Technical support')}</option>
                  <option value="otro">{t('contact_form_type_otro', 'Otro', 'Other')}</option>
                </select>
                {formErrors.type && <p className={errorClass}>{formErrors.type}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>{t('contact_form_message', 'Mensaje *', 'Message *')}</label>
                <textarea required disabled={isSubmitting} maxLength={MAX_MESSAGE_LENGTH} rows={4} value={formData.message} onChange={e => { setFormData(p => ({ ...p, message: e.target.value })); if (formErrors.message) setFormErrors(p => ({ ...p, message: '' })) }} placeholder={t('contact_form_message_ph', 'Contanos brevemente tu situación: ¿qué problema querés resolver o qué necesitás construir?', 'Tell us briefly about your situation: what problem do you want to solve or what do you need to build?')} className={`${inputClass} resize-none`} />
                {formErrors.message && <p className={errorClass}>{formErrors.message}</p>}
                <p className="text-xs text-slate-400 mt-1">{formData.message.length}/{MAX_MESSAGE_LENGTH}</p>
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Button type="submit" size="md" variant="whatsapp" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                      {t('contact_form_submitting', 'Enviando...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      {t('contact_form_submit', 'Enviar consulta por email', 'Send inquiry by email')}
                      <i className="ri-mail-send-line ml-2 text-lg"></i>
                    </>
                  )}
                </Button>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed sm:max-w-xs">
                  {t('contact_form_privacy', 'Tu información solo se usa para responderte. Sin spam.', 'Your info is only used to reply to you. No spam.')}
                </p>
              </div>
            </form>
          )}
        </article>
      </div>
    </section>
  )
}
