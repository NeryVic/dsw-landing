'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'
import JsonLd from '@/components/JsonLd'
import { supportLocalBusinessSchema } from '@/lib/schemas'
import PcBuildsModal from '@/components/sections/PcBuildsModal'
import { SUPPORT_PLANS } from '@/data/services'

const PLAN_COLORS = {
  blue: {
    badge: 'text-blue-600 dark:text-blue-400',
    price: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800/70',
    iconBox: 'border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/40',
    iconText: 'text-blue-500 dark:text-blue-400',
    btn: 'border-blue-500 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-950/40',
  },
  teal: {
    badge: 'text-teal-600 dark:text-teal-400',
    price: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800/70',
    iconBox: 'border-teal-100 bg-teal-50 dark:border-teal-900/50 dark:bg-teal-950/40',
    iconText: 'text-teal-500 dark:text-teal-400',
    btn: 'border-teal-500 text-teal-700 hover:bg-teal-50 dark:border-teal-500 dark:text-teal-300 dark:hover:bg-teal-950/40',
  },
  indigo: {
    badge: 'text-indigo-600 dark:text-indigo-400',
    price: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-300 dark:border-indigo-600/70',
    iconBox: 'border-indigo-100 bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-950/40',
    iconText: 'text-indigo-500 dark:text-indigo-400',
    btn: 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:border-indigo-500 dark:hover:bg-indigo-600',
  },
}

const SUPPORT_SERVICES = [
  {
    icon: 'ri-cpu-line',
    nameEs: 'Armado y actualización de PCs',
    nameEn: 'PC assembly and upgrades',
    detailEs: 'Si tu equipo trabaja con máquinas lentas o desbalanceadas, definimos la configuración correcta y armamos/actualizamos cada PC para mejorar rendimiento y vida útil.',
    detailEn: 'If your team works with slow or unbalanced machines, we define the right setup and build/upgrade each PC to improve performance and lifespan.',
    showBuilds: true,
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
    detailEs: 'Combinamos soporte remoto y visitas técnicas según criticidad. Cobertura presencial actual: Formosa y Chaco; remoto para otras zonas.',
    detailEn: 'We combine remote support and on-site visits based on criticality. Current on-site coverage: Formosa and Chaco; remote support for other areas.'
  }
]



const HERO_POINTS = {
  es: [
    'Diagnóstico profesional',
    'Mantenimiento preventivo',
    'Reparación de equipos',
    'Presencial en Formosa y Chaco',
  ],
  en: [
    'Professional diagnostics',
    'Preventive maintenance',
    'Equipment repair',
    'On-site in Formosa and Chaco',
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
  const [showPcModal, setShowPcModal] = useState(false)
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const servicesRef = useRef(null)
  const plansRef = useRef(null)

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

          const coverageEl = document.querySelector('.support-coverage-reveal')
          if (coverageEl) {
            gsap.fromTo(
              coverageEl,
              { autoAlpha: 0, x: -14, y: 6 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.55 }
            )
          }

          const listItems = gsap.utils.toArray('.support-hero-list-item')
          if (listItems.length) {
            gsap.fromTo(
              listItems,
              { autoAlpha: 0, x: -10, y: 8 },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.38,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.7,
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

          const planHeader = document.querySelector('.support-plan-header')
          const planCards = gsap.utils.toArray('.support-plan-card')

          if (planHeader && plansRef.current) {
            gsap.fromTo(
              planHeader,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: plansRef.current,
                  start: 'top 82%',
                },
              }
            )
          }

          if (planCards.length && plansRef.current) {
            gsap.fromTo(
              planCards,
              { autoAlpha: 0, y: 32, scale: 0.97 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.13,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: plansRef.current,
                  start: 'top 78%',
                },
              }
            )

            planCards.forEach((card) => {
              card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -6, scale: 1.02, duration: 0.22, ease: 'power2.out' })
              })
              card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, scale: 1, duration: 0.28, ease: 'power2.inOut' })
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
      <JsonLd schema={supportLocalBusinessSchema} />
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

            <p className="support-coverage-reveal mt-3 text-sm text-slate-300 max-w-xl opacity-0">
              {t(
                'support_page_coverage',
                'Soporte técnico de PC en Formosa y Chaco con atención presencial. Para otras provincias, soporte remoto coordinado.',
                'PC technical support in Formosa and Chaco with on-site service. For other provinces, coordinated remote support.'
              )}
            </p>

            <ul className="mt-7 space-y-2.5">
              {(language === 'es' ? HERO_POINTS.es : HERO_POINTS.en).map((point) => (
                <li key={point} className="support-hero-list-item flex items-center gap-3 text-slate-100 opacity-0">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-300/60 bg-blue-500/15 text-blue-200">
                    <i className="ri-check-line text-xs" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="support-hero-reveal mt-8 flex flex-wrap gap-3">
              <Button
                onClick={handleSupport}
                size="lg"
                className="bg-[#0f62fe] hover:bg-[#0b4fd1] border-0 text-white"
              >
                {t('support_page_cta', 'Solicitar diagnóstico inicial', 'Request initial diagnostic')}
              </Button>
              <Button
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                <i className="ri-price-tag-3-line mr-1.5" />
                {t('support_hero_see_plans', 'Ver planes', 'View plans')}
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
            <article key={item.nameEs} className="support-service-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 shadow-sm hover:shadow-lg dark:hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:border-blue-200 dark:hover:border-blue-900/60 will-change-transform flex flex-col">
              <div className="support-card-icon w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-5 border border-blue-100 dark:border-blue-900/40">
                <i className={`${item.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {language === 'es' ? item.nameEs : item.nameEn}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                {language === 'es' ? item.detailEs : item.detailEn}
              </p>
              {item.showBuilds && (
                <button
                  onClick={() => setShowPcModal(true)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors self-start"
                >
                  <i className="ri-computer-line text-base" />
                  {language === 'es' ? 'Ver configuraciones de referencia' : 'See reference builds'}
                  <i className="ri-arrow-right-line text-sm" />
                </button>
              )}
            </article>
          ))}
        </div>

        {/* Planes de soporte con precios */}
        <div ref={plansRef} id="planes" className="mb-8 rounded-2xl bg-slate-100 border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 px-6 py-10 sm:px-8 sm:py-12">
          <div className="support-plan-header mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Planes de soporte</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Elegí tu plan</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-xl">
              Precios de referencia · Al confirmar ajustamos la cantidad de equipos y el alcance exacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPORT_PLANS.map((plan) => {
              const c = PLAN_COLORS[plan.color] || PLAN_COLORS.blue
              return (
              <div
                key={plan.id}
                className={`support-plan-card relative rounded-xl bg-white dark:bg-zinc-900/80 border p-6 flex flex-col will-change-transform ${c.border}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-[0.07]"
                  style={{ backgroundImage: "url('/images/soporte/fondo-lineas-poligonales.png')" }}
                  aria-hidden="true"
                />

                {plan.popular && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-zinc-950 border text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap ${c.badge} border-current`}>
                    ★ Más completo
                  </span>
                )}

                <p className={`relative z-10 text-[10px] font-bold uppercase tracking-widest mb-1 ${c.badge}`}>{plan.badge}</p>
                <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white mb-4">{plan.name}</h3>

                <p className={`relative z-10 text-3xl font-bold tabular-nums mb-0.5 ${c.price}`}>{plan.price}</p>
                <p className="relative z-10 text-xs text-slate-500 mb-0.5">{plan.priceNote}</p>
                <p className="relative z-10 text-xs text-slate-500 dark:text-slate-600 mb-4">{plan.priceSub}</p>

                <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
                  {plan.audience.map((aud) => (
                    <span key={aud} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 dark:bg-zinc-800 dark:text-slate-400 dark:border-zinc-700">
                      {aud}
                    </span>
                  ))}
                </div>

                <p className="relative z-10 text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{plan.desc}</p>

                <ul className="relative z-10 space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat.label} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 ${c.iconBox}`}>
                        <i className={`${feat.icon} text-base ${c.iconText}`} />
                      </span>
                      <span>{feat.label}</span>
                    </li>
                  ))}
                </ul>

                <p className="relative z-10 text-xs text-slate-500 mb-4">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Resultado:</span> {plan.outcome}
                </p>

                <button
                  onClick={() => openWhatsApp(undefined, plan.msg)}
                  className={`relative z-10 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors border ${c.btn}`}
                >
                  {plan.cta}
                </button>
              </div>
              )
            })}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
            ¿Tu operación tiene necesidades específicas?{' '}
            <button
              onClick={() => openWhatsApp(undefined, 'Hola, necesito un plan de soporte personalizado para mi empresa. ¿Podemos hablar?')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 underline underline-offset-2 transition-colors"
            >
              Armamos un plan a medida.
            </button>
          </p>
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
      <PcBuildsModal
        open={showPcModal}
        onClose={() => setShowPcModal(false)}
        openWhatsApp={openWhatsApp}
      />
    </section>
  )
}
