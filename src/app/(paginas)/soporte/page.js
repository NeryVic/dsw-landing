'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

const SUPPORT_SERVICES = [
  {
    icon: 'ri-cpu-line',
    nameEs: 'Armado y actualización de PCs',
    nameEn: 'PC assembly and upgrades',
    detailEs: 'Si tu equipo trabaja con máquinas lentas o desbalanceadas, definimos la configuración correcta y armamos/actualizamos cada PC para mejorar rendimiento y vida útil.',
    detailEn: 'If your team works with slow or unbalanced machines, we define the right setup and build/upgrade each PC to improve performance and lifespan.'
  },
  {
    icon: 'ri-tools-line',
    nameEs: 'Mantenimiento preventivo',
    nameEn: 'Preventive maintenance',
    detailEs: 'Antes de que aparezcan cortes o caídas, realizamos limpieza, revisión térmica y control de discos/memoria para reducir riesgos y evitar paradas inesperadas.',
    detailEn: 'Before outages and failures happen, we perform cleaning, thermal checks, and disk/memory control to reduce risk and avoid unexpected downtime.'
  },
  {
    icon: 'ri-bug-line',
    nameEs: 'Soporte correctivo',
    nameEn: 'Corrective support',
    detailEs: 'Cuando surge una incidencia, diagnosticamos la causa raíz y resolvemos problemas de rendimiento, software o conectividad para restablecer tu operación rápido.',
    detailEn: 'When an incident occurs, we diagnose the root cause and resolve performance, software, or connectivity issues to restore operations quickly.'
  },
  {
    icon: 'ri-customer-service-2-line',
    nameEs: 'Soporte remoto y presencial',
    nameEn: 'Remote and on-site support',
    detailEs: 'No todas las urgencias requieren lo mismo: combinamos soporte remoto y visitas técnicas según criticidad para responder en el canal más efectivo.',
    detailEn: 'Not every issue needs the same approach: we combine remote support and on-site visits by criticality to respond through the most effective channel.'
  }
]

const HERO_POINTS = {
  es: [
    'Diagnóstico profesional',
    'Mantenimiento preventivo',
    'Reparación de equipos',
    'Soporte para empresas',
  ],
  en: [
    'Professional diagnostics',
    'Preventive maintenance',
    'Equipment repair',
    'Business support',
  ],
}

const HERO_HIGHLIGHTS = {
  es: [
    { title: 'Confianza', text: 'Procedimientos claros y seguimiento en cada intervención.' },
    { title: 'Rapidez', text: 'Priorizamos incidencias según impacto en tu operación.' },
    { title: 'Soluciones a medida', text: 'Plan de soporte ajustado a equipos, red y ritmo de trabajo.' },
  ],
  en: [
    { title: 'Trust', text: 'Clear procedures and follow-up in every intervention.' },
    { title: 'Speed', text: 'We prioritize incidents by operational impact.' },
    { title: 'Tailored solutions', text: 'A support plan adapted to your devices, network, and workflow.' },
  ],
}

export default function SoporteTecnicoPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const servicesRef = useRef(null)

  useEffect(() => {
    let ctx = null

    async function setupAnimations() {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])

        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const heroItems = gsap.utils.toArray('.support-hero-reveal')
          const serviceCards = gsap.utils.toArray('.support-service-card')

          if (heroItems.length) {
            gsap.fromTo(
              heroItems,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power2.out',
              }
            )
          }

          if (heroBgRef.current && heroRef.current) {
            gsap.fromTo(
              heroBgRef.current,
              { y: 0 },
              {
                y: -90,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              }
            )
          }

          if (serviceCards.length && servicesRef.current) {
            gsap.fromTo(
              serviceCards,
              { autoAlpha: 0, y: 28, scale: 0.97 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: servicesRef.current,
                  start: 'top 82%',
                },
              }
            )

            serviceCards.forEach((card) => {
              const icon = card.querySelector('.support-card-icon')
              card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -7, scale: 1.025, duration: 0.22, ease: 'power2.out' })
                if (icon) gsap.to(icon, { scale: 1.18, rotate: -6, duration: 0.22, ease: 'back.out(2)' })
              })
              card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, scale: 1, duration: 0.28, ease: 'power2.inOut' })
                if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.24, ease: 'power2.inOut' })
              })
            })
          }

          ScrollTrigger.refresh()
        })
      } catch (error) {
        console.error('Error animando soporte:', error)
      }
    }

    setupAnimations()

    return () => {
      if (ctx?.revert) ctx.revert()
    }
  }, [])

  const handleSupport = () => {
    const message = language === 'es'
      ? 'Hola, necesito soporte técnico para equipos de mi empresa. ¿Podemos coordinar una revisión?'
      : 'Hi, I need technical support for my company PCs. Can we schedule a review?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div ref={heroRef} className="relative min-h-[88vh] overflow-hidden pt-28 pb-8">
        <div ref={heroBgRef} className="absolute left-0 right-0 top-[-14%] bottom-[-14%] z-0 will-change-transform">
          <Image
            src="/images/soporte/soport.jpg"
            alt={t(
              'support_hero_image_alt',
              'Servicio técnico para empresas con mantenimiento y reparación de equipos',
              'Business technical support with maintenance and equipment repair'
            )}
            fill
            priority
            className="object-cover object-[68%_center] sm:object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-[#040a14]/62" />

        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            

            <h1 className="support-hero-reveal mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              {t('support_page_title', 'Soporte técnico para que tu operación no se detenga.', 'Technical support to keep your operation running.')}
            </h1>

            <p className="support-hero-reveal mt-5 text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
              {t(
                'support_page_intro',
                'Ayudamos a pymes y profesionales a reducir caídas, resolver incidencias más rápido y mantener equipos estables para trabajar con continuidad.',
                'We help SMBs and professionals reduce downtime, resolve incidents faster, and keep systems stable for day-to-day continuity.'
              )}
            </p>

            <ul className="support-hero-reveal mt-7 space-y-2.5">
              {(language === 'es' ? HERO_POINTS.es : HERO_POINTS.en).map((point) => (
                <li key={point} className="flex items-center gap-3 text-slate-100">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-300/60 bg-blue-500/15 text-blue-200">
                    <i className="ri-check-line text-xs" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="support-hero-reveal mt-8">
              <Button
                onClick={handleSupport}
                size="lg"
                className="bg-[#0f62fe] hover:bg-[#0b4fd1] border-0 text-white"
              >
                {t('support_page_cta', 'Solicitar diagnóstico inicial', 'Request initial diagnostic')}
              </Button>
            </div>
          </div>

          <div className="support-hero-reveal mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/20 pt-5">
            {(language === 'es' ? HERO_HIGHLIGHTS.es : HERO_HIGHLIGHTS.en).map((item) => (
              <div key={item.title} className="rounded-lg border border-white/12 bg-black/20 px-4 py-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">{item.title}</p>
                <p className="mt-1 text-sm text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {SUPPORT_SERVICES.map((item) => (
            <article key={item.nameEs} className="support-service-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 shadow-sm hover:shadow-lg dark:hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:border-blue-200 dark:hover:border-blue-900/60 will-change-transform">
              <div className="support-card-icon w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-5 border border-blue-100 dark:border-blue-900/40">
                <i className={`${item.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {language === 'es' ? item.nameEs : item.nameEn}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' ? item.detailEs : item.detailEn}
              </p>
            </article>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
            {t('support_page_sla_title', 'Compromiso de atención', 'Service commitment')}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t(
              'support_page_sla_desc',
              'Definimos prioridades, canales y tiempos de respuesta según criticidad para que sepas qué esperar en cada incidencia.',
              'We define priorities, channels, and response times by criticality, so you know what to expect for each incident.'
            )}
          </p>
          <Button onClick={handleSupport} size="lg">
            {t('support_page_cta', 'Solicitar diagnóstico inicial', 'Request initial diagnostic')}
          </Button>
        </div>
      </div>
    </section>
  )
}
