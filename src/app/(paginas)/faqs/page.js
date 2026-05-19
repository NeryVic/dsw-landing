'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schemas'
import { useWssp } from '@/hooks/wssp'

export default function FaqsPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const [openIndex, setOpenIndex] = useState(null)
  const openIndexRef = useRef(null)
  const contentRefs = useRef([])
  const iconRefs = useRef([])

  const faqs = useMemo(
    () => [
      {
        question: language === 'es' ? '¿Qué diferencia hay entre un sistema a medida y comprar un software genérico?' : 'What is the difference between a custom system and buying generic software?',
        answer:
          language === 'es'
            ? 'Un software genérico obliga a tu equipo a adaptarse a procesos que no son los suyos. Un sistema a medida se construye alrededor de cómo trabaja tu negocio real, eliminando pasos innecesarios, integrando lo que ya usás y escalando a tu ritmo, no al del proveedor.'
            : 'Generic software forces your team to adapt to processes that are not their own. A custom system is built around how your real business works, eliminating unnecessary steps, integrating what you already use, and scaling at your pace, not the vendor\'s.'
      },
      {
        question: language === 'es' ? '¿Trabajan con empresas pequeñas o medianas?' : 'Do you work with small or medium companies?',
        answer:
          language === 'es'
            ? 'Sí. Trabajamos con pymes, profesionales y equipos en crecimiento que necesitan ordenar y escalar su operación. No necesitás ser una empresa grande para beneficiarte de un sistema bien diseñado.'
            : 'Yes. We work with SMBs, professionals, and growing teams that need to organize and scale operations. You do not need to be a large company to benefit from a well-designed system.'
      },
      {
        question: language === 'es' ? '¿Cuánto tarda un sistema a medida?' : 'How long does a custom system take?',
        answer:
          language === 'es'
            ? 'Depende del alcance. En la mayoría de los casos iniciamos con un MVP entre 4 y 8 semanas y luego evolucionamos por etapas. Así generás valor real desde el primer sprint sin esperar meses para ver resultados.'
            : 'It depends on scope. In most cases we start with an MVP in 4 to 8 weeks and then evolve in stages. This way you generate real value from the first sprint without waiting months to see results.'
      },
      {
        question: language === 'es' ? '¿Cómo cotizan los proyectos? ¿Tienen idea de cuánto puede costar?' : 'How do you price projects? Do you have a ballpark cost?',
        answer:
          language === 'es'
            ? 'Primero realizamos un diagnóstico breve y luego enviamos una propuesta con alcance, etapas, tiempos y costos. Los proyectos varían según complejidad: un MVP funcional puede arrancar desde un presupuesto accesible, mientras que sistemas más complejos se acuerdan por fases para que puedas planificar la inversión.'
            : 'We start with a short diagnostic and then send a proposal with scope, stages, timelines, and costs. Projects vary by complexity: a functional MVP can start at an accessible budget, while more complex systems are agreed phase by phase so you can plan your investment.'
      },
      {
        question: language === 'es' ? '¿Se puede pagar en cuotas o por etapas?' : 'Can you pay in installments or by phase?',
        answer:
          language === 'es'
            ? 'Sí. Estructuramos los proyectos en etapas con pagos asociados a entregables concretos. No pagás todo por adelantado: cada desembolso se corresponde con avances verificables del sistema.'
            : 'Yes. We structure projects in phases with payments tied to concrete deliverables. You do not pay everything upfront: each payment corresponds to verifiable system progress.'
      },
      {
        question: language === 'es' ? '¿El sistema queda en la nube o en mis servidores?' : 'Does the system run in the cloud or on my servers?',
        answer:
          language === 'es'
            ? 'Depende de tus necesidades. Podemos desplegar en la nube (VPS, cloud managed) o en infraestructura propia si el proyecto lo requiere. Lo definimos durante el diagnóstico según tu contexto de seguridad, conectividad y presupuesto de operación.'
            : 'It depends on your needs. We can deploy on the cloud (VPS, managed cloud) or on your own infrastructure if the project requires it. We define this during the diagnostic based on your security context, connectivity, and operational budget.'
      },
      {
        question: language === 'es' ? '¿Puedo integrar el sistema con herramientas que ya uso (AFIP, WhatsApp, planillas, etc.)?' : 'Can I integrate the system with tools I already use (billing services, WhatsApp, spreadsheets, etc.)?',
        answer:
          language === 'es'
            ? 'En la mayoría de los casos, sí. Evaluamos las integraciones disponibles durante el diagnóstico. Herramientas como WhatsApp Business API, servicios de facturación electrónica, exportaciones a Excel y conexión con otras APIs son parte de nuestro alcance habitual.'
            : 'In most cases, yes. We evaluate available integrations during the diagnostic. Tools like WhatsApp Business API, electronic billing services, Excel exports, and connections to other APIs are part of our usual scope.'
      },
      {
        question: language === 'es' ? '¿Qué pasa si el proyecto necesita cambios mientras se está desarrollando?' : 'What happens if the project needs changes during development?',
        answer:
          language === 'es'
            ? 'Es completamente normal. Trabajamos con metodología ágil y revisiones periódicas, así que los cambios de prioridad se incorporan al siguiente sprint sin generar conflictos. Antes de iniciar acordamos un proceso claro para gestionar ajustes de alcance sin sorpresas en el costo.'
            : 'That is completely normal. We work with agile methodology and regular reviews, so priority changes are incorporated into the next sprint without conflict. Before starting, we agree on a clear process to manage scope adjustments without cost surprises.'
      },
      {
        question: language === 'es' ? '¿Me entregan el código fuente del sistema?' : 'Do you deliver the source code of the system?',
        answer:
          language === 'es'
            ? 'Sí. Al cerrar el proyecto te entregamos el código fuente completo. El sistema es tuyo al 100%, podés auditarlo, modificarlo con otro equipo o escalarlo en el futuro sin depender de nosotros.'
            : 'Yes. When the project closes we deliver the full source code. The system is 100% yours — you can audit it, modify it with another team, or scale it in the future without depending on us.'
      },
      {
        question: language === 'es' ? '¿Incluyen soporte luego de entregar?' : 'Do you include support after delivery?',
        answer:
          language === 'es'
            ? 'Sí. Podemos definir un esquema de soporte mensual para incidencias, mejoras y mantenimiento evolutivo. Cada plan tiene tiempos de respuesta garantizados según la criticidad del problema.'
            : 'Yes. We can define a monthly support plan for incidents, improvements, and ongoing maintenance. Each plan includes guaranteed response times based on issue criticality.'
      },
      {
        question: language === 'es' ? '¿En qué ciudades o zonas trabajan?' : 'Which cities or areas do you work in?',
        answer:
          language === 'es'
            ? 'El desarrollo de software y la mayoría de los servicios los prestamos de forma remota sin restricción geográfica. Para soporte técnico presencial (mantenimiento de PCs, redes), cubrimos Formosa y Chaco; para otras zonas coordinamos según disponibilidad.'
            : 'Software development and most services are provided remotely without geographic restrictions. For on-site technical support (PC maintenance, networks), we cover Formosa and Chaco; for other areas we coordinate based on availability.'
      },
      {
        question: language === 'es' ? '¿Qué pasa con mis datos si en algún momento dejo de contratar el servicio?' : 'What happens to my data if I stop using the service?',
        answer:
          language === 'es'
            ? 'Tus datos son tuyos en todo momento. Antes de cerrar cualquier contrato, te entregamos una exportación completa de la base de datos en formato estándar. Al recibir el código fuente, también podés migrar o continuar la operación con total independencia.'
            : 'Your data is yours at all times. Before closing any contract, we provide a full database export in a standard format. With the source code in hand, you can also migrate or continue operations with complete independence.'
      },
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
