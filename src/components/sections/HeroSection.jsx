'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/dswBG.png"
          alt="Digital Solutions Web Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm font-medium">
              {t('hero_badge', 'Soluciones Digitales Profesionales', '🚀 Professional Digital Solutions')}
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block">
              {t('hero_title_line1', 'DIGITAL', 'DIGITAL')}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
              {t('hero_title_line2', 'SOLUTIONS', 'SOLUTIONS')}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">
              {t('hero_title_line3', 'WEB', 'WEB')}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
            {t('hero_subtitle', 
              'Convertimos ideas en soluciones digitales', 
              'We turn ideas into digital solutions'
            )}
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-2xl">
            {t('hero_description', 
              'Creamos landing pages que convierten, sistemas POS eficientes, plataformas de reservas y tiendas online completas. Tu éxito digital comienza aquí.',
              'We create converting landing pages, efficient POS systems, booking platforms and complete online stores. Your digital success starts here.'
            )}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl inline-flex items-center justify-center"
            >
              {t('hero_cta_primary', 'Empezar Mi Proyecto', 'Start My Project')}
              <i className="ri-arrow-right-line ml-2"></i>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm inline-flex items-center justify-center"
            >
              {t('hero_cta_secondary', 'Ver Portafolio', 'View Portfolio')}
              <i className="ri-eye-line ml-2"></i>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center sm:text-left">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300 text-sm">
                {t('hero_stat1', 'Proyectos Exitosos', 'Successful Projects')}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300 text-sm">
                {t('hero_stat2', 'Clientes Satisfechos', 'Satisfied Clients')}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm">
                {t('hero_stat3', 'Soporte Técnico', 'Technical Support')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-12 h-12 bg-yellow-400/80 backdrop-blur-sm rounded-full flex items-center justify-center text-xl animate-bounce z-20">
        💡
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">
            {t('scroll_down', 'Desliza para ver más', 'Scroll to see more')}
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}