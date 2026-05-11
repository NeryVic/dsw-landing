'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

const SERVICES = [
  {
    titleEs: 'Desarrollo Web Profesional',
    titleEn: 'Professional Web Development',
    descEs: 'Sitios corporativos y landing pages orientadas a generar consultas reales y mejorar presencia digital.',
    descEn: 'Corporate websites and landing pages focused on real lead generation and stronger digital presence.',
    bulletsEs: ['Sitios institucionales', 'Landing pages de conversión', 'Optimización SEO técnica'],
    bulletsEn: ['Institutional websites', 'Conversion-focused landing pages', 'Technical SEO optimization']
  },
  {
    titleEs: 'Sistemas a Medida',
    titleEn: 'Custom Software Systems',
    descEs: 'Soluciones para automatizar operaciones, reducir errores y obtener control de procesos en tiempo real.',
    descEn: 'Solutions to automate operations, reduce errors, and gain real-time process control.',
    bulletsEs: ['Paneles administrativos', 'Flujos internos personalizados', 'Integraciones con herramientas existentes'],
    bulletsEn: ['Admin dashboards', 'Custom internal workflows', 'Integrations with existing tools']
  },
  {
    titleEs: 'Soporte Técnico de PCs',
    titleEn: 'PC Technical Support',
    descEs: 'Soporte para empresas y equipos de trabajo: armado, mantenimiento preventivo y resolución de fallas.',
    descEn: 'Support for companies and teams: assembly, preventive maintenance, and troubleshooting.',
    bulletsEs: ['Armado y actualización de equipos', 'Mantenimiento preventivo', 'Asistencia remota y presencial'],
    bulletsEn: ['PC build and upgrades', 'Preventive maintenance', 'Remote and on-site support']
  }
]

export default function ServiciosPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleQuote = () => {
    const message = language === 'es'
      ? 'Hola, quiero cotizar sus servicios para mi empresa. ¿Podemos agendar una llamada breve?'
      : 'Hi, I want to get a quote for your services for my company. Can we schedule a short call?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-100 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('services_page_title', 'Servicios para Empresas que Necesitan Resultados', 'Services for Companies That Need Results')}
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            {t(
              'services_page_subtitle',
              'Combinamos desarrollo web, sistemas a medida y soporte técnico para resolver problemas operativos concretos.',
              'We combine web development, custom systems, and technical support to solve concrete operational problems.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.titleEs}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {language === 'es' ? service.titleEs : service.titleEn}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {language === 'es' ? service.descEs : service.descEn}
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {(language === 'es' ? service.bulletsEs : service.bulletsEn).map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
            {t('services_page_cta_title', '¿No sabés por dónde empezar?', "Not sure where to start?")}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            {t(
              'services_page_cta_desc',
              'Te ayudamos a definir qué servicio te conviene según tu situación actual y presupuesto.',
              'We help you define the right service based on your current situation and budget.'
            )}
          </p>
          <Button onClick={handleQuote} size="lg">
            {t('services_page_cta_btn', 'Solicitar diagnóstico', 'Request diagnostic call')}
          </Button>
        </div>
      </div>
    </section>
  )
}
