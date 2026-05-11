'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

const PROCESS = [
  {
    titleEs: '1. Diagnóstico operativo',
    titleEn: '1. Operational diagnostic',
    descEs: 'Revisamos cómo trabaja tu equipo, dónde hay cuellos de botella y qué impacto tienen.',
    descEn: 'We review how your team works, where bottlenecks exist, and their impact.'
  },
  {
    titleEs: '2. Propuesta y alcance',
    titleEn: '2. Proposal and scope',
    descEs: 'Definimos funcionalidades prioritarias, tiempos y etapas de implementación.',
    descEn: 'We define priority features, timeline, and implementation stages.'
  },
  {
    titleEs: '3. Desarrollo por sprints',
    titleEn: '3. Sprint-based development',
    descEs: 'Construimos en entregas cortas para validar rápido y ajustar con datos reales.',
    descEn: 'We build in short deliveries to validate quickly and adjust with real data.'
  },
  {
    titleEs: '4. Soporte y mejora continua',
    titleEn: '4. Support and continuous improvement',
    descEs: 'Acompañamos la operación con mejoras evolutivas y soporte técnico continuo.',
    descEn: 'We support operations through iterative improvements and ongoing technical support.'
  }
]

export default function SistemasPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleContact = () => {
    const message = language === 'es'
      ? 'Hola, quiero evaluar un sistema a medida para mi operación. ¿Podemos iniciar un diagnóstico?'
      : 'Hi, I want to evaluate a custom system for my operations. Can we start with a diagnostic call?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('systems_page_title', 'Sistemas a Medida para Resolver Problemas Reales', 'Custom Systems to Solve Real Problems')}
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            {t(
              'systems_page_intro',
              'Diseñamos software en función de tus procesos, no al revés. El objetivo es reducir errores, ahorrar tiempo y mejorar control operativo.',
              'We design software around your processes, not the other way around. The goal is to reduce errors, save time, and improve operational control.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <article className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              {t('systems_page_for_title', '¿Para quién es ideal?', 'Who is this ideal for?')}
            </h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>• {t('systems_page_for_1', 'Empresas con tareas manuales repetitivas.', 'Companies with repetitive manual tasks.')}</li>
              <li>• {t('systems_page_for_2', 'Equipos con errores frecuentes de carga y seguimiento.', 'Teams with frequent data-entry and tracking errors.')}</li>
              <li>• {t('systems_page_for_3', 'Negocios que crecieron y necesitan ordenar su operación.', 'Businesses that grew and need to organize operations.')}</li>
            </ul>
          </article>

          <article className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              {t('systems_page_impact_title', 'Impacto esperado', 'Expected impact')}
            </h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>• {t('systems_page_impact_1', 'Menos retrabajos y menos errores de operación.', 'Less rework and fewer operational errors.')}</li>
              <li>• {t('systems_page_impact_2', 'Visibilidad en tiempo real de indicadores clave.', 'Real-time visibility into key indicators.')}</li>
              <li>• {t('systems_page_impact_3', 'Procesos escalables con mejor trazabilidad.', 'Scalable processes with better traceability.')}</li>
            </ul>
          </article>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-5">
            {t('systems_page_process_title', 'Cómo trabajamos', 'How we work')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROCESS.map((step) => (
              <div key={step.titleEs} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {language === 'es' ? step.titleEs : step.titleEn}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  {language === 'es' ? step.descEs : step.descEn}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button onClick={handleContact} size="lg">
              {t('systems_page_cta', 'Quiero evaluar mi caso', 'I want to assess my case')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
