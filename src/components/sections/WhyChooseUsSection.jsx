'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const WhyChooseUsData = [
  {
    id: 1,
    title: 'Experiencia Comprobada',
    titleEn: 'Proven Experience',
    description: 'Aunque somos nuevos, nuestro equipo tiene años de experiencia en desarrollo web y conoce las mejores prácticas del mercado.',
    descriptionEn: 'Although we are new, our team has years of experience in web development and knows the best market practices.',
    icon: 'ri-target-line'
  },
  {
    id: 2,
    title: 'Tecnología Moderna',
    titleEn: 'Modern Technology',
    description: 'Utilizamos las últimas tecnologías para garantizar sitios web rápidos, seguros y escalables.',
    descriptionEn: 'We use the latest technologies to ensure fast, secure and scalable websites.',
    icon: 'ri-flashlight-line'
  },
  {
    id: 3,
    title: 'Precios Competitivos',
    titleEn: 'Competitive Prices',
    description: 'Como empresa nueva, ofrecemos precios especiales para nuestros primeros clientes sin comprometer la calidad.',
    descriptionEn: 'As a new company, we offer special prices for our first clients without compromising quality.',
    icon: 'ri-money-dollar-circle-line'
  },
  {
    id: 4,
    title: 'Soporte Personalizado',
    titleEn: 'Personalized Support',
    description: 'Cada cliente es importante para nosotros. Brindamos atención personalizada y soporte dedicado.',
    descriptionEn: 'Every client is important to us. We provide personalized attention and dedicated support.',
    icon: 'ri-customer-service-line'
  },
  {
    id: 5,
    title: 'Entrega Rápida',
    titleEn: 'Fast Delivery',
    description: 'Optimizamos nuestros procesos para entregar proyectos de calidad en tiempo récord.',
    descriptionEn: 'We optimize our processes to deliver quality projects in record time.',
    icon: 'ri-rocket-line'
  },
  {
    id: 6,
    title: 'SEO Incluido',
    titleEn: 'SEO Included',
    description: 'Todos nuestros proyectos incluyen optimización SEO básica para mejorar tu visibilidad online.',
    descriptionEn: 'All our projects include basic SEO optimization to improve your online visibility.',
    icon: 'ri-line-chart-line'
  }
]

export default function WhyChooseUsSection() {
  const { language, t } = useLanguage()

  return (
    <section id="why-choose-us" className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            {t('why_badge', '¿Por qué elegir Digital Solutions Web?', 'Why choose Digital Solutions Web?')}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('why_title', 'Nuevos en el Mercado, Expertos en Resultados', 'New to the Market, Experts in Results')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('why_description', 
              'Aprovecha las ventajas de trabajar con una empresa nueva que tiene la experiencia y la motivación para hacer que tu proyecto sea un éxito.',
              'Take advantage of working with a new company that has the experience and motivation to make your project a success.'
            )}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {WhyChooseUsData.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4 text-blue-600 dark:text-blue-400">
                <i className={`${item.icon} text-4xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {language === 'es' ? item.title : item.titleEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'es' ? item.description : item.descriptionEn}
              </p>
            </div>
          ))}
        </div>

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              {t('offer_title', '🎉 Oferta de Lanzamiento', '🎉 Launch Offer')}
            </h3>
            <p className="text-xl mb-6 opacity-90">
              {t('offer_description', 
                'Como empresa nueva, ofrecemos 20% de descuento en tu primer proyecto + consultoría SEO gratuita por ser uno de nuestros primeros clientes.',
                'As a new company, we offer 20% off your first project + free SEO consulting for being one of our first clients.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 rounded-lg px-6 py-3">
                <span className="text-sm opacity-80">
                  {t('offer_code', 'Código:', 'Code:')}
                </span>
                <br />
                <span className="text-2xl font-bold">NUEVO20</span>
              </div>
              <div className="text-sm opacity-80">
                {t('offer_validity', 'Válido hasta fin de mes', 'Valid until end of month')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}