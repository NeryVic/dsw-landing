'use client'

import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schemas'

export default function FaqsPage() {
  const { language, t } = useLanguage()

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

  return (
    <section className="min-h-screen pt-28 pb-16 bg-white dark:bg-slate-950">
      <JsonLd schema={faqSchema(faqs)} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('faq_page_title', 'Preguntas Frecuentes', 'Frequently Asked Questions')}
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            {t(
              'faq_page_intro',
              'Respuestas claras sobre tiempos, costos, alcance y soporte para que puedas decidir con información real.',
              'Clear answers about timelines, costs, scope, and support so you can decide with real information.'
            )}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq) => (
            <article key={faq.question} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{faq.question}</h2>
              <p className="text-slate-700 dark:text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
