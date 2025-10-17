'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import {TrustSignals , ProcessSteps}  from '@/data/features'
import { useWssp } from '@/hooks/wssp'

export default function TrustAndProcessSection() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleStartProject = () => {
    const message = language === 'es'
      ? '¡Hola! Quiero empezar mi proyecto con Digital Solutions Web. Me gustaría agendar una consulta inicial gratuita para discutir mis necesidades.'
      : 'Hello! I want to start my project with Digital Solutions Web. I would like to schedule a free initial consultation to discuss my needs.'
    openWhatsApp(undefined, message)
  }

  return (
    <section id="process" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Signals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
              {t('trust_badge', 'Tu Tranquilidad es Nuestra Prioridad', 'Your Peace of Mind is Our Priority')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('trust_title', 'Trabajamos con Garantías Reales', 'We Work with Real Guarantees')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TrustSignals.map((signal) => (
              <div key={signal.id} className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="text-3xl mb-3 text-green-600 dark:text-green-400">
                  <i className={`${signal.icon} text-3xl`}></i>
                </div>
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
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
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
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-blue-200 dark:bg-blue-700 transform translate-x-0"></div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="px-8 py-4" onClick={handleStartProject}>
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