'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants'
import { useWssp } from '@/hooks/wssp'

export default function ContactoPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const cardsRef = useRef(null)
  

  const [formData, setFormData] = useState({ name: '', company: '', email: '', type: '', message: '' })
  const [formSent, setFormSent] = useState(false)

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
              icons.forEach(icon =>
                gsap.to(icon, { scale: 1.2, rotate: -5, duration: 0.22, ease: 'back.out(2)' })
              )
            })
            card.addEventListener('mouseleave', () => {
              gsap.to(card, { y: 0, duration: 0.28, ease: 'power2.inOut', force3D: false })
              icons.forEach(icon =>
                gsap.to(icon, { scale: 1, rotate: 0, duration: 0.24, ease: 'power2.inOut' })
              )
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const typeLabel = {
      sistema: 'Sistema a medida',
      web: 'Sitio web / Landing',
      soporte: 'Soporte técnico',
      otro: 'Otro',
    }
    const typeLabelEn = {
      sistema: 'Custom system',
      web: 'Website / Landing',
      soporte: 'Technical support',
      otro: 'Other',
    }
    const lines = language === 'es'
      ? [
          `Hola, me contacto desde el formulario web.`,
          `*Nombre:* ${formData.name}`,
          formData.company ? `*Empresa:* ${formData.company}` : '',
          formData.email ? `*Email:* ${formData.email}` : '',
          formData.type ? `*Consulta sobre:* ${typeLabel[formData.type] || formData.type}` : '',
          formData.message ? `*Mensaje:* ${formData.message}` : '',
        ]
      : [
          `Hi, I am writing from the contact form.`,
          `*Name:* ${formData.name}`,
          formData.company ? `*Company:* ${formData.company}` : '',
          formData.email ? `*Email:* ${formData.email}` : '',
          formData.type ? `*Regarding:* ${typeLabelEn[formData.type] || formData.type}` : '',
          formData.message ? `*Message:* ${formData.message}` : '',
        ]
    const message = lines.filter(Boolean).join('\n')
    openWhatsApp(undefined, message)
    setFormSent(true)
  }

  const inputClass = 'w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition'
  const labelClass = 'block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide'

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mb-14">
          
          <h1 className="contact-header-reveal opacity-0 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t('contact_page_title', 'Hablemos de tu Proyecto', 'Let\'s Talk About Your Project')}
          </h1>
          <p className="contact-header-reveal opacity-0 text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t(
              'contact_page_intro',
              'Contanos tu situación actual y te proponemos una solución concreta según tus objetivos y presupuesto.',
              'Tell us your current situation and we will propose a concrete solution according to your goals and budget.'
            )}
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
              {t(
                'contact_page_cta_desc',
                'En una primera conversación podemos definir prioridades, alcance inicial y próximos pasos.',
                'In a first conversation we can define priorities, initial scope, and next steps.'
              )}
            </p>
            <Button onClick={handleContact} size="lg">
              {t('contact_page_cta_btn', 'Escribir por WhatsApp', 'Message on WhatsApp')}
            </Button>
          </article>
        </div>

        {/* Contact Form */}
        <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {t('contact_form_title', 'Envianos un mensaje', 'Send us a message')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {t('contact_form_subtitle',
              'Completá el formulario y te respondemos por WhatsApp o email en menos de 24 horas.',
              'Fill out the form and we will respond via WhatsApp or email within 24 hours.'
            )}
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
                {t('contact_form_sent_desc',
                  'Se abrió WhatsApp con tu consulta. Te respondemos a la brevedad.',
                  'WhatsApp opened with your inquiry. We will get back to you shortly.'
                )}
              </p>
              <button
                onClick={() => { setFormSent(false); setFormData({ name: '', company: '', email: '', type: '', message: '' }) }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('contact_form_send_another', 'Enviar otra consulta', 'Send another inquiry')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  {t('contact_form_name', 'Nombre *', 'Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder={t('contact_form_name_ph', 'Tu nombre', 'Your name')}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('contact_form_company', 'Empresa', 'Company')}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                  placeholder={t('contact_form_company_ph', 'Nombre de tu empresa (opcional)', 'Company name (optional)')}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('contact_form_email', 'Email', 'Email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder={t('contact_form_email_ph', 'tu@email.com', 'you@email.com')}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('contact_form_type', 'Consulta sobre', 'Regarding')}
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                  className={inputClass}
                >
                  <option value="">{t('contact_form_type_default', 'Seleccioná una opción', 'Select an option')}</option>
                  <option value="sistema">{t('contact_form_type_sistema', 'Sistema a medida', 'Custom system')}</option>
                  <option value="web">{t('contact_form_type_web', 'Sitio web / Landing', 'Website / Landing')}</option>
                  <option value="soporte">{t('contact_form_type_soporte', 'Soporte técnico', 'Technical support')}</option>
                  <option value="otro">{t('contact_form_type_otro', 'Otro', 'Other')}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  {t('contact_form_message', 'Mensaje *', 'Message *')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder={t('contact_form_message_ph',
                    'Contanos brevemente tu situación: ¿qué problema querés resolver o qué necesitás construir?',
                    'Tell us briefly about your situation: what problem do you want to solve or what do you need to build?'
                  )}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-4">
                <Button type="submit" size="lg" variant="whatsapp">
                  {t('contact_form_submit', 'Enviar por WhatsApp', 'Send via WhatsApp')}
                  <i className="ri-whatsapp-line ml-2 text-lg"></i>
                </Button>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t('contact_form_privacy',
                    'Tu información solo se usa para responderte. Sin spam.',
                    'Your info is only used to reply to you. No spam.'
                  )}
                </p>
              </div>
            </form>
          )}
        </article>

      </div>
    </section>
  )
}
