'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { WhyChooseUsData } from '@/data/features'



export default function WhyChooseUsSection() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const gridRef = useRef(null)
  const stRef = useRef(null)
  const gsapRef = useRef(null)

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
        gsapRef.current = gsapLib
        stRef.current = ScrollTrigger

        const items = gridRef.current ? Array.from(gridRef.current.querySelectorAll('.why-item')) : []
        if (items.length === 0) return

        gsapLib.set(items, { clearProps: 'all' })

        ctx = gsapLib.context(() => {
          gsapLib.fromTo(items,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: { amount: 0.5, from: 'start' },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }, gridRef.current)

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

    return (
      <section id="why-choose-us" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            {t('why_badge', '¿Por qué elegir Digital Solutions Web?', 'Why choose Digital Solutions Web?')}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('why_title', 'Tu Proyecto Merece Tecnología y Dedicación Profesional', 'Your Project Deserves Professional Technology and Dedication')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('why_description', 
              'Combinamos experiencia técnica sólida con atención personalizada para crear soluciones digitales que impulsan el crecimiento real de tu negocio.',
              'We combine solid technical experience with personalized attention to create digital solutions that drive real growth for your business.'
            )}
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {WhyChooseUsData.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 why-item"
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
      </div>
    </section>
  )
}