'use client'
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import {TrustSignals , ProcessSteps}  from '@/data/features'
import { useWssp } from '@/hooks/wssp'

export default function TrustAndProcessSection() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const pathname = usePathname()
  const trustTitleRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaTitleRef = useRef(null)
  const ctaDescRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    let ctx = null
    let cancelled = false

    async function initAnim() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        if (cancelled) return
        gsapLib.registerPlugin(ScrollTrigger)

        const steps = stepsRef.current
          ? Array.from(stepsRef.current.querySelectorAll('.process-step'))
          : []

        if (trustTitleRef.current) gsapLib.set(trustTitleRef.current, { clearProps: 'all' })
        if (steps.length > 0) gsapLib.set(steps, { clearProps: 'all' })

        ctx = gsapLib.context(() => {
          if (trustTitleRef.current) {
            gsapLib.fromTo(
              trustTitleRef.current,
              { opacity: 0, y: 16 },
              {
                opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                scrollTrigger: {
                  trigger: trustTitleRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              }
            )
          }

          if (steps.length > 0) {
            gsapLib.fromTo(
              steps,
              { opacity: 0, x: -32 },
              {
                opacity: 1, x: 0, duration: 0.7,
                stagger: { amount: 0.5, from: 'start' },
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stepsRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse'
                }
              }
            )
          }
        }, stepsRef.current)

        ScrollTrigger.refresh()
      } catch (e) {}
    }

    const raf = requestAnimationFrame(() => initAnim())

    return () => {
      cancelAnimationFrame(raf)
      cancelled = true
      try { ctx?.revert() } catch (e) {}
    }
  }, [pathname])

  const handleStartProject = () => {
    const message = language === 'es'
      ? '¡Hola! Quiero empezar mi proyecto con Digital Solutions Web. Me gustaría agendar una consulta inicial gratuita para discutir mis necesidades.'
      : 'Hello! I want to start my project with Digital Solutions Web. I would like to schedule a free initial consultation to discuss my needs.'
    openWhatsApp(undefined, message)
  }

  return (
    <section id="process" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Signals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-blue-100 dark:border-blue-900/40">
              {t('trust_badge', 'Tu Tranquilidad es Nuestra Prioridad', 'Your Peace of Mind is Our Priority')}
            </span>
            <h2 ref={trustTitleRef} className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
              {t('trust_title', 'Trabajamos con Garantías Reales', 'We Work with Real Guarantees')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TrustSignals.map((signal) => (
              <div key={signal.id} className="p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-2 border-t-green-500 dark:border-t-green-400 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/40">
                  <i className={`${signal.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm">
                  {language === 'es' ? signal.title : signal.titleEn}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === 'es' ? signal.description : signal.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div ref={ctaRef} >
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-blue-100 dark:border-blue-900/40">
              {t('process_badge', 'Nuestro Proceso', 'Our Process')}
            </span>
            <h2 ref={ctaTitleRef} className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
              {t('process_title', 'Cómo Trabajamos Contigo', 'How We Work With You')}
            </h2>
            <p ref={ctaDescRef} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {language === 'es' ? step.title : step.titleEn}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              {t('process_cta_subtitle', 'Consulta inicial gratuita • Sin compromiso', 'Free initial consultation • No commitment')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}