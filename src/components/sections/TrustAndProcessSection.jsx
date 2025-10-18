'use client' // Esta directiva es crucial para que los hooks de cliente funcionen
import React, { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import {TrustSignals , ProcessSteps}  from '@/data/features'
import { useWssp } from '@/hooks/wssp'

export default function TrustAndProcessSection() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const ctaRef = useRef(null)
  const ctaTitleRef = useRef(null)
  const ctaDescRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    let ctx = null

    async function initAnimations() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        try { gsapLib.registerPlugin && gsapLib.registerPlugin(ScrollTrigger) } catch (e) {}

        // Respect user's reduced-motion preference
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
          console.warn('[GSAP] prefers-reduced-motion está activado, pero se fuerza la animación para pruebas.')
          // No retornamos, forzamos animación
        }

        if (gsapLib.context) {
          ctx = gsapLib.context(() => {
            // 1. Animación para el encabezado del proceso (CTA)
            if (ctaRef.current) {
              const tl = gsapLib.timeline({
                scrollTrigger: {
                  trigger: ctaRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              })
              tl.from(ctaTitleRef.current, { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out' })
                .from(ctaDescRef.current, { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, '-=0.5')
              
              // Solo animación de entrada, sin pulso infinito
            }

            // 2. Animación para los pasos del proceso
            const steps = stepsRef.current ? Array.from(stepsRef.current.querySelectorAll('.process-step')) : []
            if (steps.length > 0) {
              let cols = 1
              try {
                const comp = window.getComputedStyle(stepsRef.current)
                const template = comp.gridTemplateColumns || ''
                cols = template.split(' ').filter(Boolean).length || 1
              } catch (e) { cols = 1 }
              const rows = Math.ceil(steps.length / cols)
              const staggerObj = { grid: [cols, rows], from: 'center', each: 0.12 }

              gsapLib.from(steps, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: staggerObj,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stepsRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              })
            }
          })
        }
      } catch (err) {
        // progressive enhancement
      }
    }

    initAnimations()

    return () => {
      try { ctx && ctx.revert && ctx.revert() } catch (e) {}
    }
  }, [])

  // Animación GSAP SOLO para los process steps: fade+slide+stagger de izquierda a derecha
  useEffect(() => {
    let ctx = null

    async function initSteps() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        try { gsapLib.registerPlugin && gsapLib.registerPlugin(ScrollTrigger) } catch (e) {}

        // Accesibilidad: respeta prefers-reduced-motion
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const steps = stepsRef.current ? Array.from(stepsRef.current.querySelectorAll('.process-step')) : []
        if (steps.length === 0) return

        // Fade + slide + stagger de izquierda a derecha
        gsapLib.from(steps, {
          opacity: 0,
          x: -32,
          duration: 0.7,
          stagger: { amount: 0.5, from: 'start' },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      } catch (err) {
        // progressive enhancement
      }
    }

    initSteps()

    return () => {
      try { ctx && ctx.revert && ctx.revert() } catch (e) {}
    }
  }, [])

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
        <div ref={ctaRef} >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              {t('process_badge', 'Nuestro Proceso', 'Our Process')}
            </span>
            <h2 ref={ctaTitleRef} className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('process_title', 'Cómo Trabajamos Contigo', 'How We Work With You')}
            </h2>
            <p ref={ctaDescRef} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('process_description', 
                'Un proceso transparente y colaborativo para garantizar el éxito de tu proyecto',
                'A transparent and collaborative process to guarantee the success of your project'
              )}
            </p>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {ProcessSteps.map((step, index) => (
              <div key={step.step} className="relative process-step">
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