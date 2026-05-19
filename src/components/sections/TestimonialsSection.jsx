'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { testimonialsData } from '@/data/testimonials'
import { useWssp } from '@/hooks/wssp'

export default function TestimonialsSection() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const { openWhatsApp } = useWssp()
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
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-amber-100 dark:border-amber-900/40">
            {t('testimonials_badge', 'Testimonios', 'Testimonials')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5 max-w-3xl mx-auto">
            {t('testimonials_title', 'Lo que Dicen Nuestros Clientes', 'What Our Clients Say')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials_description',
              'Conoce las experiencias de empresarios que confiaron en nosotros para transformar sus negocios digitalmente.',
              'Learn about the experiences of entrepreneurs who trusted us to transform their businesses digitally.'
            )}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-2 border-t-amber-400 dark:border-t-amber-500 border-l-2 border-l-amber-400 dark:border-l-amber-500 rounded-xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-sm testimonial-card"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={`Avatar de ${testimonial.name}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 dark:border-blue-700"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-950/60 dark:bg-blue-950 rounded-full flex items-center justify-center text-blue-300 font-bold text-sm border border-blue-800/40 shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t('testimonials_cta_label', '¿Querés resultados similares para tu negocio?', 'Want similar results for your business?')}
          </p>
          <button
            onClick={() => {
              const msg = language === 'es'
                ? 'Hola, leí los testimonios en su web y me gustaría hablar sobre cómo pueden ayudar a mi negocio.'
                : 'Hi, I read the testimonials on your website and would like to talk about how you can help my business.'
              openWhatsApp(undefined, msg)
            }}
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm hover:underline transition-colors"
          >
            {t('testimonials_cta_btn', 'Hablemos de tu proyecto →', "Let's talk about your project →")}
          </button>
        </div>

      </div>
    </section>
  )
}