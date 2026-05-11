'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { testimonialsData } from '@/data/testimonials'

export default function TestimonialsSection() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const testimonialsRef = useRef(null)
  const stRef = useRef(null)
  const gsapRef = useRef(null)

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-700'
        }`}
      >
        ★
      </span>
    ))
  }

  // Animación GSAP para las tarjetas de testimonios
  useEffect(() => {
    let ctx = null
    let cancelled = false

    async function initTestimonialsAnim() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        if (cancelled) return
        gsapLib.registerPlugin(ScrollTrigger)
        gsapRef.current = gsapLib
        stRef.current = ScrollTrigger

        const cards = testimonialsRef.current ? Array.from(testimonialsRef.current.querySelectorAll('.testimonial-card')) : []
        if (cards.length === 0) return

        gsapLib.set(cards, { clearProps: 'all' })

        ctx = gsapLib.context(() => {
          gsapLib.fromTo(cards,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: { amount: 0.4, from: 'start' },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: testimonialsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }, testimonialsRef.current)

        ScrollTrigger.refresh()
      } catch (err) {}
    }

    const raf = requestAnimationFrame(() => initTestimonialsAnim())

    return () => {
      cancelAnimationFrame(raf)
      cancelled = true
      try { ctx?.revert() } catch (e) {}
    }
  }, [pathname])

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
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
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 testimonial-card"
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
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={`Avatar de ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-400 dark:border-blue-600"
                  />
                ) : (
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
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
      </div>
    </section>
  )
}