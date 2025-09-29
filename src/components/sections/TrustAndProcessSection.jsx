'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'

const TrustSignals = [
  {
    id: 1,
    title: 'Garantía de Satisfacción',
    titleEn: 'Satisfaction Guarantee',
    description: '30 días para solicitar cambios sin costo adicional',
    descriptionEn: '30 days to request changes at no additional cost',
    icon: '✅'
  },
  {
    id: 2,
    title: 'Soporte Técnico',
    titleEn: 'Technical Support',
    description: '3 meses de soporte técnico gratuito incluido',
    descriptionEn: '3 months of free technical support included',
    icon: '🛠️'
  },
  {
    id: 3,
    title: 'Hosting Gratuito',
    titleEn: 'Free Hosting',
    description: 'Primer año de hosting incluido en todos los proyectos',
    descriptionEn: 'First year of hosting included in all projects',
    icon: '🌐'
  },
  {
    id: 4,
    title: 'SSL y Seguridad',
    titleEn: 'SSL & Security',
    description: 'Certificado SSL y medidas de seguridad incluidas',
    descriptionEn: 'SSL certificate and security measures included',
    icon: '🔒'
  }
]

const ProcessSteps = [
  {
    step: 1,
    title: 'Consulta Inicial',
    titleEn: 'Initial Consultation',
    description: 'Reunión para entender tus necesidades y objetivos',
    descriptionEn: 'Meeting to understand your needs and objectives'
  },
  {
    step: 2,
    title: 'Propuesta y Cotización',
    titleEn: 'Proposal & Quote',
    description: 'Desarrollo de propuesta detallada con cronograma',
    descriptionEn: 'Development of detailed proposal with timeline'
  },
  {
    step: 3,
    title: 'Desarrollo',
    titleEn: 'Development',
    description: 'Creación de tu proyecto con actualizaciones constantes',
    descriptionEn: 'Creation of your project with constant updates'
  },
  {
    step: 4,
    title: 'Entrega y Soporte',
    titleEn: 'Delivery & Support',
    description: 'Lanzamiento y capacitación con soporte continuo',
    descriptionEn: 'Launch and training with continuous support'
  }
]

export default function TrustAndProcessSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Signals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
              {t('trust_badge', 'Tu Tranquilidad es Nuestra Prioridad', 'Your Peace of Mind is Our Priority')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('trust_title', 'Trabajamos con Garantías Reales', 'We Work with Real Guarantees')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TrustSignals.map((signal) => (
              <div key={signal.id} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-3xl mb-3">{signal.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'es' ? signal.title : signal.titleEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'es' ? signal.description : signal.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              {t('process_badge', 'Nuestro Proceso', 'Our Process')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('process_title', 'Cómo Trabajamos Contigo', 'How We Work With You')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('process_description', 
                'Un proceso transparente y colaborativo para garantizar el éxito de tu proyecto',
                'A transparent and collaborative process to guarantee the success of your project'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {ProcessSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'es' ? step.title : step.titleEn}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'es' ? step.description : step.descriptionEn}
                  </p>
                </div>
                {index < ProcessSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-blue-200 dark:bg-blue-800 transform translate-x-0"></div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="px-8 py-4">
              {t('process_cta', 'Empezar Mi Proyecto Ahora', 'Start My Project Now')}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t('process_cta_subtitle', 'Consulta inicial gratuita • Sin compromiso', 'Free initial consultation • No commitment')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}