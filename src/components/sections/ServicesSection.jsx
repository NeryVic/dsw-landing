'use client'

import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { SERVICES } from '@/lib/constants'
import { useWssp } from '@/hooks/wssp'

// Iconos de Remix Icon para cada servicio
const ServiceIcons = {
  landing: <i className="ri-file-text-line text-2xl"></i>,
  pos: <i className="ri-bank-card-line text-2xl"></i>,
  booking: <i className="ri-calendar-check-line text-2xl"></i>,
  ecommerce: <i className="ri-shopping-cart-line text-2xl"></i>
}

export default function ServicesSection() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const servicesRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaTitleRef = useRef(null)
  const ctaDescRef = useRef(null)

  useEffect(() => {
    let ctx = null
    let gsapLib = null
    let st = null

    async function init() {
      try {
        const mod = await import('gsap')
        gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        st = stMod.default ?? stMod
        try { gsapLib.registerPlugin && gsapLib.registerPlugin(st) } catch (e) {}

        const cards = servicesRef.current ? Array.from(servicesRef.current.querySelectorAll('.service-card')) : []
        if (cards.length === 0) return

        // create a context for scoped animations (if gsap.context available)
        if (gsapLib.context) {
          ctx = gsapLib.context(() => {
            gsapLib.from(cards, {
              opacity: 0,
              x: -32,
              duration: 1.7,
              stagger: { from: 'start' },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: servicesRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            })
          }, servicesRef.current)
        } else {
          // fallback if context not available
          gsapLib.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          })
        }
      } catch (err) {
        // ignore - animation is progressive enhancement
      }
    }

    init()

    return () => {
      try { ctx && ctx.revert && ctx.revert() } catch (e) {}
      try { st && st.kill && st.kill() } catch (e) {}
    }
  }, [])

  // CTA animation: entrada sutil y pulso discreto en el título
  useEffect(() => {
    let ctx = null
    async function initCTA() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        try { gsapLib.registerPlugin && gsapLib.registerPlugin(ScrollTrigger) } catch (e) {}

        if (!ctaRef.current) return

        if (gsapLib.context) {
          ctx = gsapLib.context(() => {
            const tl = gsapLib.timeline({
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            })

            tl.from(ctaTitleRef.current, { opacity: 0, y: 18, duration: 0.8, ease: 'power2.out' })
              .from(ctaDescRef.current, { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, '-=0.5')

            // pulso sutil y profesional en el título
            gsapLib.to(ctaTitleRef.current, {
              scale: 1.02,
              duration: 1.2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              transformOrigin: 'center center',
              delay: 0.3
            })
          }, ctaRef.current)
        } else {
          // fallback: simple animation without context
          gsapLib.from(ctaTitleRef.current, { opacity: 0, y: 18, duration: 0.8, ease: 'power2.out' })
          gsapLib.from(ctaDescRef.current, { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out', delay: 0.3 })
          gsapLib.to(ctaTitleRef.current, { scale: 1.02, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'center center', delay: 0.6 })
        }
      } catch (e) {
        // progressive enhancement: ignore errors
      }
    }

    initCTA()

    return () => {
      try { ctx && ctx.revert && ctx.revert() } catch (e) {}
    }
  }, [])

  const handleServiceQuote = (serviceName) => {
    const message = language === 'es' 
      ? `¡Hola! Me interesa obtener una cotización para el servicio: ${serviceName}. ¿Podrían darme más información?`
      : `Hello! I'm interested in getting a quote for the service: ${serviceName}. Could you give me more information?`
    openWhatsApp(undefined, message)
  }

  const handleCustomQuote = () => {
    const message = language === 'es'
      ? '¡Hola! Me interesa solicitar una cotización personalizada para mi proyecto. ¿Podemos hablar sobre mis necesidades?'
      : 'Hello! I\'m interested in requesting a custom quote for my project. Can we discuss my needs?'
    openWhatsApp(undefined, message)
  }

  return (
    <section id="services" className="py-20 bg-white dark:bg-black animate-fadeIn duration-1000">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            {t('services_badge', 'Nuestros Servicios', 'Our Services')}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services_title', 'Soluciones Digitales Completas', 'Complete Digital Solutions')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services_description', 
              'Desde landing pages hasta sistemas complejos de gestión. Tenemos la solución perfecta para hacer crecer tu negocio.',
              'From landing pages to complex management systems. We have the perfect solution to grow your business.'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SERVICES.map((service, index) => (
            <Card key={service.id} className="service-card group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-900 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleServiceQuote(language === 'es' ? service.title : service.titleEn)}
                  >
                    {t('service_cta', 'Cotizar', 'Quote')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 ref={ctaTitleRef} className="text-3xl font-bold mb-4">
            {t('services_cta_title', '¿No encuentras lo que buscas?', "Can't find what you're looking for?")}
          </h3>
          <p ref={ctaDescRef} className="text-xl mb-8 opacity-90">
            {t('services_cta_description', 
              'Desarrollamos soluciones personalizadas para tu negocio. Cuéntanos tu idea y la haremos realidad.',
              'We develop custom solutions for your business. Tell us your idea and we\'ll make it happen.'
            )}
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={handleCustomQuote}
          >
            {t('services_cta_button', 'Solicitar Cotización Personalizada', 'Request Custom Quote')}
          </Button>
        </div>
      </div>
    </section>
  )
}