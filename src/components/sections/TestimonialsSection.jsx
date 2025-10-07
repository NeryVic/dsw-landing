'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { testimonialsData } from '@/data/testimonials'

export default function TestimonialsSection() {
  const { language, t } = useLanguage()

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      >
        ★
      </span>
    ))
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            {t('testimonials_badge', 'Testimonios', 'Testimonials')}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('testimonials_title', 'Lo que Dicen Nuestros Clientes', 'What Our Clients Say')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('testimonials_description', 
              'Conoce las experiencias de empresarios que confiaron en nosotros para transformar sus negocios digitalmente.',
              'Learn about the experiences of entrepreneurs who trusted us to transform their businesses digitally.'
            )}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t('testimonials_cta_title', '¿Listo para ser nuestro próximo caso de éxito?', 'Ready to be our next success story?')}
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t('testimonials_cta_description', 
                'Únete a empresarios exitosos que ya transformaron sus negocios con nuestras soluciones digitales.',
                'Join successful entrepreneurs who have already transformed their businesses with our digital solutions.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
              >
                {t('testimonials_cta_button', 'Comenzar Mi Proyecto', 'Start My Project')}
                <i className="ri-arrow-right-line ml-2"></i>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 inline-flex items-center"
              >
                {t('testimonials_cta_whatsapp', 'Consulta por WhatsApp', 'WhatsApp Consultation')}
                <i className="ri-whatsapp-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}