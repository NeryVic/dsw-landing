'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schemas'
import { useWssp } from '@/hooks/wssp'
import { faqs } from '@/data/faqs'

export default function FaqsPage() {
  const { t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const [openIndex, setOpenIndex] = useState(null)
  const openIndexRef = useRef(null)
  const contentRefs = useRef([])
  const iconRefs = useRef([])

  

  // Animación de entrada
  useEffect(() => {
    let ctx
    async function enter() {
      const { default: gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.fromTo(
          '.faq-header-reveal',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
        )
        gsap.fromTo(
          '.faq-item',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.35 }
        )
      })
    }
    enter()
    return () => ctx?.revert()
  }, [])

  async function toggle(idx) {
    const { default: gsap } = await import('gsap')
    const prevIdx = openIndexRef.current

    // Cerrar el item abierto anterior
    if (prevIdx !== null) {
      const prevContent = contentRefs.current[prevIdx]
      const prevIcon = iconRefs.current[prevIdx]
      if (prevContent) gsap.to(prevContent, { height: 0, duration: 0.32, ease: 'power2.inOut' })
      if (prevIcon) gsap.to(prevIcon, { rotation: 0, duration: 0.26, ease: 'power2.inOut' })
    }

    const isOpening = prevIdx !== idx
    if (isOpening) {
      const content = contentRefs.current[idx]
      const icon = iconRefs.current[idx]
      if (content) {
        gsap.fromTo(
          content,
          { height: 0 },
          {
            height: content.scrollHeight,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => { content.style.height = 'auto' },
          }
        )
      }
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.28, ease: 'back.out(1.5)' })
      setOpenIndex(idx)
      openIndexRef.current = idx
    } else {
      setOpenIndex(null)
      openIndexRef.current = null
    }
  }

  return (
    <section className="min-h-screen pt-28 pb-20 bg-white dark:bg-slate-950">
      <JsonLd schema={faqSchema(faqs)} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

        {/* Header */}
        <div className="mb-14">
         
          <h1 className="faq-header-reveal opacity-0 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t('faq_page_title', 'Preguntas Frecuentes', 'Frequently Asked Questions')}
          </h1>
          <p className="faq-header-reveal opacity-0 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              'faq_page_intro',
              'Respuestas claras sobre tiempos, costos, alcance y soporte para que puedas decidir con información real.',
              'Clear answers about timelines, costs, scope, and support so you can decide with real information.'
            )}
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map((faq, i) => (
            <div key={faq.question} className="faq-item opacity-0">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-semibold text-slate-900 dark:text-slate-100 pr-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                  {faq.question}
                </span>
                <span
                  ref={el => { iconRefs.current[i] = el }}
                  className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150"
                  style={{ transformOrigin: 'center' }}
                >
                  <i className="ri-add-line text-xl leading-none" />
                </span>
              </button>
              <div
                ref={el => { contentRefs.current[i] = el }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <p className="pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center border-t border-slate-100 dark:border-slate-800 pt-12">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {t('faq_cta_title', '¿Tenés más dudas?', 'Still have questions?')}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {t('faq_cta_desc',
              'Escribinos y te respondemos en menos de 24 horas.',
              'Write to us and we will respond within 24 hours.'
            )}
          </p>
          <button
            onClick={() => {
              const msg = language === 'es'
                ? 'Hola, leí las preguntas frecuentes y tengo una consulta que no está listada. ¿Podemos conversar?'
                : 'Hi, I read the FAQ and have a question that is not listed. Can we talk?'
              openWhatsApp(undefined, msg)
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
          >
            <i className="ri-whatsapp-line text-base"></i>
            {t('faq_cta_btn', 'Hablemos por WhatsApp', 'Let\'s chat on WhatsApp')}
          </button>
        </div>

      </div>
    </section>
  )
}
