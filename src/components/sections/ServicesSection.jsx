'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SERVICES } from '@/lib/constants'

// Iconos SVG para cada servicio
const ServiceIcons = {
  landing: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  pos: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  booking: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  ecommerce: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

export default function ServicesSection() {
  const { language, t } = useLanguage()

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            {t('services_badge', 'Nuestros Servicios', 'Our Services')}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services_title', 'Soluciones Digitales Completas', 'Complete Digital Solutions')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services_description', 
              'Desde landing pages que convierten hasta sistemas complejos de gestión. Tenemos la solución perfecta para hacer crecer tu negocio.',
              'From converting landing pages to complex management systems. We have the perfect solution to grow your business.'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SERVICES.map((service, index) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {ServiceIcons[service.icon]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'es' ? service.title : service.titleEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {language === 'es' ? service.description : service.descriptionEn}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {(language === 'es' ? service.features : service.featuresEn).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {language === 'es' ? service.price : service.priceEn}
                  </span>
                  <Button variant="outline" size="sm">
                    {t('service_cta', 'Cotizar', 'Quote')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            {t('services_cta_title', '¿No encuentras lo que buscas?', "Can't find what you're looking for?")}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {t('services_cta_description', 
              'Desarrollamos soluciones personalizadas para tu negocio. Cuéntanos tu idea y la haremos realidad.',
              'We develop custom solutions for your business. Tell us your idea and we\'ll make it happen.'
            )}
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            {t('services_cta_button', 'Solicitar Cotización Personalizada', 'Request Custom Quote')}
          </Button>
        </div>
      </div>
    </section>
  )
}