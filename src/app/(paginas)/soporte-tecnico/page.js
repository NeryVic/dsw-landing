'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

const SUPPORT_SERVICES = [
  {
    icon: 'ri-cpu-line',
    nameEs: 'Armado y actualización de PCs',
    nameEn: 'PC assembly and upgrades',
    detailEs: 'Equipos armados según uso (oficina, diseño, desarrollo, gaming) con recomendación de componentes.',
    detailEn: 'Machines assembled by use case (office, design, development, gaming) with component guidance.'
  },
  {
    icon: 'ri-tools-line',
    nameEs: 'Mantenimiento preventivo',
    nameEn: 'Preventive maintenance',
    detailEs: 'Limpieza interna, revisión térmica, estado de disco y memoria para prevenir fallas.',
    detailEn: 'Internal cleaning, thermal checks, disk/memory status to prevent failures.'
  },
  {
    icon: 'ri-bug-line',
    nameEs: 'Soporte correctivo',
    nameEn: 'Corrective support',
    detailEs: 'Diagnóstico y resolución de problemas de rendimiento, software y conectividad.',
    detailEn: 'Diagnosis and resolution for performance, software, and connectivity issues.'
  },
  {
    icon: 'ri-customer-service-2-line',
    nameEs: 'Soporte remoto y presencial',
    nameEn: 'Remote and on-site support',
    detailEs: 'Atención adaptada al tipo de incidencia y urgencia del negocio.',
    detailEn: 'Assistance adapted to incident type and business urgency.'
  }
]

export default function SoporteTecnicoPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleSupport = () => {
    const message = language === 'es'
      ? 'Hola, necesito soporte técnico para equipos de mi empresa. ¿Podemos coordinar una revisión?'
      : 'Hi, I need technical support for my company PCs. Can we schedule a review?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mb-14">
          <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-blue-100 dark:border-blue-900/40">
            {t('support_badge', 'Soporte Técnico', 'Technical Support')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t('support_page_title', 'Soporte Técnico de PCs para Empresas y Profesionales', 'PC Technical Support for Companies and Professionals')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t(
              'support_page_intro',
              'Brindamos soporte técnico confiable para mantener tus equipos estables, seguros y productivos.',
              'We provide reliable technical support to keep your machines stable, secure, and productive.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {SUPPORT_SERVICES.map((item) => (
            <article key={item.nameEs} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700">
              <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-5 border border-blue-100 dark:border-blue-900/40">
                <i className={`${item.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {language === 'es' ? item.nameEs : item.nameEn}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' ? item.detailEs : item.detailEn}
              </p>
            </article>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
            {t('support_page_sla_title', 'Compromiso de atención', 'Service commitment')}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t(
              'support_page_sla_desc',
              'Definimos tiempos de respuesta y un plan de soporte claro para que tu operación no se detenga.',
              'We define response times and a clear support plan so your operation does not stop.'
            )}
          </p>
          <Button onClick={handleSupport} size="lg">
            {t('support_page_cta', 'Solicitar revisión técnica', 'Request technical review')}
          </Button>
        </div>

      </div>
    </section>
  )
}
