'use client'

import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useWssp } from '@/hooks/wssp'

export default function HeroSection() {
  const pathname = usePathname()
  const { t, language } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleStartProject = () => {
    const message = language === 'es'
      ? 'Hola, quiero un diagnostico para desarrollar un sistema a medida y resolver cuellos de botella en mi operacion.'
      : 'Hi, I want a diagnostic call to build a custom system and solve bottlenecks in my operation.'
    openWhatsApp(undefined, message)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden group">
      {/* Background video */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <video
          className="hero-media absolute inset-0 h-full w-full object-cover object-[center_top] sm:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/images/hero/dsw-hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 sm:py-20 sm:pt-28">
        <div className="w-full max-w-4xl mx-auto sm:mx-0">

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight text-center sm:text-left">
            <span className="block">
              {t('hero_title_line1', 'SISTEMAS', 'SYSTEMS')}
            </span>
            <span className="block text-[#d4e9ff]">
              {t('hero_title_line2', 'A MEDIDA', 'BUILT AROUND')}
            </span>
            <span className="block text-white/85">
              {t('hero_title_line3', 'PARA TU NEGOCIO', 'YOUR BUSINESS')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed text-center sm:text-left">
            {t('hero_subtitle',
              'Eliminamos tareas manuales, errores operativos y falta de control con software diseñado para tu flujo real.',
              'We remove manual work, operational errors, and blind spots with software designed for your real workflow.'
            )}
          </p>

          {/* Description — versión completa en sm+, reducida en mobile */}
          <p className="text-base lg:text-lg text-gray-300 mb-10 sm:mb-12 max-w-2xl sm:hidden">
            {t('hero_description_short',
              'Analizamos tu flujo real, detectamos cuellos de botella y construimos el sistema que tu equipo necesita.',
              'We analyze your real workflow and build the system your team actually needs.'
            )}
          </p>
          <p className="hidden sm:block text-base lg:text-lg text-gray-300 mb-10 sm:mb-12 max-w-2xl">
            {t('hero_description',
              'Analizamos cómo trabaja tu equipo, detectamos cuellos de botella y construimos un sistema que automatiza lo crítico sin romper tu operación actual.',
              'We analyze how your team works, detect bottlenecks, and build a system that automates critical tasks without disrupting your current operation.'
            )}
          </p>

          {/* CTA */}
          <div className="flex justify-center sm:justify-start mb-12 sm:mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg bg-[#0f62fe] hover:bg-[#0b4fd1] text-white border-0 shadow-xl inline-flex items-center justify-center"
              onClick={handleStartProject}
            >
              {t('hero_cta_primary', 'Quiero un Diagnostico', 'Book a Diagnostic Call')}
              <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto sm:mx-0">
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">24h</div>
              <div className="text-gray-300 text-xs sm:text-sm">
                {t('hero_stat1', 'Diagnostico inicial', 'Initial diagnostic')}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Etapas</div>
              <div className="text-gray-300 text-xs sm:text-sm">
                {t('hero_stat2', 'Sin invertir todo de una', 'Invest phase by phase')}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">1:1</div>
              <div className="text-gray-300 text-xs sm:text-sm">
                {t('hero_stat3', 'Acompanamiento tecnico', 'Technical guidance')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}