'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schemas'

export default function FaqsPage() {
  const { language, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const openIndexRef = useRef(null)
  const contentRefs = useRef([])
  const iconRefs = useRef([])

  const faqs = useMemo(
    () => [
      {
        question: language === 'es' ? '¿Cuánto tarda un sistema a medida?' : 'How long does a custom system take?',
        answer:
          language === 'es'
            ? 'Depende del alcance. En la mayoría de los casos iniciamos con un MVP entre 4 y 8 semanas y luego evolucionamos por etapas.'
            : 'It depends on scope. In most cases we start with an MVP in 4 to 8 weeks and then evolve in stages.'
      },
      {
        question: language === 'es' ? '¿Trabajan con empresas pequeñas o medianas?' : 'Do you work with small or medium companies?',
        answer:
          language === 'es'
            ? 'Sí. Trabajamos con pymes, profesionales y equipos en crecimiento que necesitan ordenar y escalar su operación.'
            : 'Yes. We work with SMBs, professionals, and growing teams that need to organize and scale operations.'
      },
      {
        question: language === 'es' ? '¿Incluyen soporte luego de entregar?' : 'Do you include support after delivery?',
        answer:
          language === 'es'
            ? 'Sí. Podemos definir un esquema de soporte mensual para incidencias, mejoras y mantenimiento evolutivo.'
            : 'Yes. We can define a monthly support plan for incidents, improvements, and ongoing maintenance.'
      },
      {
        question: language === 'es' ? '¿Cómo cotizan los proyectos?' : 'How do you price projects?',
        answer:
          language === 'es'
            ? 'Primero realizamos un diagnóstico breve y luego enviamos una propuesta con alcance, etapas, tiempos y costos.'
            : 'We start with a short diagnostic and then send a proposal with scope, stages, timelines, and costs.'
      },
      {
        question: language === 'es' ? '¿Hacen soporte de PCs a domicilio o remoto?' : 'Do you provide remote or on-site PC support?',
        answer:
          language === 'es'
            ? 'Sí, según el tipo de problema. Podemos resolver incidencias en remoto o coordinar asistencia presencial.'
            : 'Yes, depending on the issue type. We can solve incidents remotely or coordinate on-site assistance.'
      }
    ],
    [language]
  )

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

  // Cerrar todo al cambiar de idioma
  useEffect(() => {
    async function closeAll() {
      const { default: gsap } = await import('gsap')
      contentRefs.current.forEach(el => { if (el) gsap.set(el, { height: 0 }) })
      iconRefs.current.forEach(el => { if (el) gsap.set(el, { rotation: 0 }) })
    }
    closeAll()
    setOpenIndex(null)
    openIndexRef.current = null
  }, [language])

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
          <p className="faq-header-reveal opacity-0 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            {t('faq_badge', 'Preguntas Frecuentes', 'FAQ')}
          </p>
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

      </div>
    </section>
  )
}
