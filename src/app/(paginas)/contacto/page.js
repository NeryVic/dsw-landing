'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants'
import { useWssp } from '@/hooks/wssp'

export default function ContactoPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const cardsRef = useRef(null)

  useEffect(() => {
    let ctx
    async function setup() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Header
        gsap.fromTo(
          '.contact-header-reveal',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        )

        // Cards entrada
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

          // Hover microinteracciones
          cards.forEach(card => {
            const icons = card.querySelectorAll('.contact-icon')
            card.addEventListener('mouseenter', () => {
              gsap.to(card, { y: -2, scale: 1.02, duration: 0.22, ease: 'power2.out' })
              icons.forEach(icon =>
                gsap.to(icon, { scale: 1.2, rotate: -5, duration: 0.22, ease: 'back.out(2)' })
              )
            })
            card.addEventListener('mouseleave', () => {
              gsap.to(card, { y: 0, scale: 1, duration: 0.28, ease: 'power2.inOut' })
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

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mb-14">
          <span className="contact-header-reveal opacity-0 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-blue-100 dark:border-blue-900/40">
            {t('contact_badge', 'Contacto', 'Contact')}
          </span>
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

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 will-change-transform">
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

          <article className="contact-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 will-change-transform">
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

      </div>
    </section>
  )
}
