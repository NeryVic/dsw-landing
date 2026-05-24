'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import FeatureWaveCard from '@/components/ui/FeatureWaveCard'
import { useWssp } from '@/hooks/wssp'

const FEATURE_CARDS = [
  {
    id: 'fit',
    icon: 'ri-team-line',
    tone: 'blue',
    titleEs: '¿Es para vos?',
    titleEn: 'Is this for you?',
    textEs: 'Si usás un SaaS que no termina de encajar, o gestionás procesos críticos en planillas, un sistema a medida puede ser el cambio que tu operación necesita.',
    textEn: 'If you use a SaaS that does not quite fit, or manage critical processes in spreadsheets, a custom system may be the change your operation needs.',
    ctaEs: 'Descubrir si aplica a mi negocio',
    ctaEn: 'Discover if it fits my business',
  },
  {
    id: 'impact',
    icon: 'ri-bar-chart-box-line',
    tone: 'emerald',
    titleEs: 'Impacto que vas a notar',
    titleEn: 'Impact you will notice',
    textEs: 'Menos retrabajos, indicadores en tiempo real y procesos listos para escalar.',
    textEn: 'Less rework, real-time indicators, and processes ready to scale.',
    ctaEs: 'Quiero ver resultados',
    ctaEn: 'I want to see results',
  },
  {
    id: 'process',
    icon: 'ri-loop-left-line',
    tone: 'amber',
    titleEs: 'Cómo trabajamos juntos',
    titleEn: 'How we work together',
    textEs: 'Diagnóstico, propuesta clara, desarrollo ágil y soporte continuo. Paso a paso, sin sorpresas.',
    textEn: 'Diagnostic, clear proposal, agile development, and continuous support. Step by step, no surprises.',
    ctaEs: 'Conocer el proceso',
    ctaEn: 'Know the process',
  },
  {
    id: 'diagnostic',
    icon: 'ri-search-eye-line',
    tone: 'violet',
    titleEs: 'Evaluá tu caso',
    titleEn: 'Assess your case',
    textEs: 'Solicitá un diagnóstico gratuito y descubrí cómo optimizar tu operación.',
    textEn: 'Request a free diagnostic and discover how to optimize your operation.',
    ctaEs: 'Solicitar diagnóstico',
    ctaEn: 'Request diagnostic',
  },
]

const CARD_STYLES = {
  blue: {
    wrap: 'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 pt-5 pb-16 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] hover:border-slate-300 dark:border-slate-800 dark:bg-[#05070d] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] dark:hover:border-slate-700',
    badge: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-[#080f1f] dark:border-[#0d2044] dark:text-blue-200',
    icon: 'text-blue-700 bg-blue-100 border-blue-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-blue-400 dark:bg-[#060d1f] dark:border-[#0e2a52]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
  emerald: {
    wrap: 'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 pt-5 pb-16 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] hover:border-slate-300 dark:border-slate-800 dark:bg-[#05070d] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] dark:hover:border-slate-700',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-[#061410] dark:border-[#0e3023] dark:text-emerald-200',
    icon: 'text-emerald-700 bg-emerald-100 border-emerald-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-emerald-400 dark:bg-[#05120e] dark:border-[#0c2d1c]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
  amber: {
    wrap: 'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 pt-5 pb-16 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] hover:border-slate-300 dark:border-slate-800 dark:bg-[#05070d] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] dark:hover:border-slate-700',
    badge: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-[#1b1308] dark:border-[#3b2410] dark:text-amber-200',
    icon: 'text-amber-700 bg-amber-100 border-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-amber-400 dark:bg-[#271608] dark:border-[#4a2b0f]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
  violet: {
    wrap: 'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 pt-5 pb-16 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] hover:border-slate-300 dark:border-slate-800 dark:bg-[#05070d] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] dark:hover:border-slate-700',
    badge: 'bg-violet-50 border-violet-200 text-violet-900 dark:bg-[#100a1f] dark:border-[#2a1550] dark:text-violet-200',
    icon: 'text-violet-700 bg-violet-100 border-violet-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-violet-400 dark:bg-[#0e0820] dark:border-[#261248]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
}

const SAAS_CONS = [
  { title: 'Funciones innecesarias', desc: 'Pagás funciones que nunca vas a usar' },
  { title: 'Tu operación se adapta al sistema', desc: 'Adaptás tu operación al sistema, no al revés' },
  { title: 'Soporte genérico', desc: 'Soporte estándar que no conoce tu negocio' },
  { title: 'Costos que escalan', desc: 'Licencias que crecen con cada usuario o módulo extra' },
  { title: 'Personalización limitada', desc: 'Personalizaciones limitadas o directamente imposibles' },
  { title: 'Sin control de tus datos', desc: 'Tus datos en servidores de terceros, sin control real' },
]

const MEDIDA_PROS = [
  { title: 'Solo lo que necesitás', desc: 'Solo las funciones que tu operación realmente necesita' },
  { title: 'El sistema se adapta a vos', desc: 'El sistema se construye sobre tu flujo de trabajo actual' },
  { title: 'Conocemos tu negocio', desc: 'Quienes lo desarrollaron conocen tu lógica de negocio' },
  { title: 'Inversión predecible', desc: 'Inversión única, sin sorpresas en el costo mensual' },
  { title: 'Flexibilidad total', desc: 'Cualquier cambio, integración o módulo nuevo es posible' },
  { title: 'Control total de tus datos', desc: 'Elegís dónde y cómo se almacenan tus datos' },
]

const COMPARE_STATS = [
  { value: '100%', label: 'Personalizable' },
  { value: '0', label: 'Licencias mensuales' },
  { value: '∞', label: 'Integraciones posibles' },
  { value: 'Tuyo', label: 'Control de datos' },
]

export default function SistemasPageClient() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const cardsGridRef = useRef(null)
  const compareRef = useRef(null)

  useEffect(() => {
    let ctx = null

    async function setupAnimations() {
      try {
        const mod = await import('gsap')
        const gsap = mod.default ?? mod

        if (!cardsGridRef.current) return

        ctx = gsap.context(() => {
          const cards = gsap.utils.toArray('.systems-card')
          const waves = gsap.utils.toArray('.systems-wave')
          const waveRows = gsap.utils.toArray('.systems-wave-row')

          if (!cards.length) return

          gsap.fromTo(cards, { autoAlpha: 0, y: 30, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.14, ease: 'power2.out' })

          waves.forEach((wave, index) => {
            gsap.to(wave, {
              y: index % 2 === 0 ? -6 : 6,
              duration: 2.8 + index * 0.25,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          })

          waveRows.forEach((row, index) => {
            gsap.to(row, {
              x: index % 2 === 0 ? -26 : 26,
              duration: 2.9 + index * 0.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          })
        }, cardsGridRef.current)
      } catch (error) {
        console.error('Error animando cards de sistemas-a-medida:', error)
      }
    }

    setupAnimations()

    return () => {
      if (ctx?.revert) ctx.revert()
    }
  }, [])

  useEffect(() => {
    let ctx = null

    async function setupCompareAnimations() {
      try {
        const [modGsap, modST] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        const gsap = modGsap.default ?? modGsap
        const { ScrollTrigger } = modST

        gsap.registerPlugin(ScrollTrigger)

        if (!compareRef.current) return

        ctx = gsap.context(() => {
          const header = compareRef.current.querySelector('.systems-compare-header')
          const cards = gsap.utils.toArray('.systems-compare-card', compareRef.current)
          const stats = gsap.utils.toArray('.systems-compare-stat', compareRef.current)

          if (header) {
            gsap.fromTo(header, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: header, start: 'top 85%' } })
          }

          if (cards.length) {
            gsap.fromTo(cards, { autoAlpha: 0, y: 32, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: compareRef.current, start: 'top 80%' } })

            cards.forEach((card) => {
              card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, scale: 1.015, duration: 0.22, ease: 'power2.out' }))
              card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, scale: 1, duration: 0.28, ease: 'power2.inOut' }))
            })
          }

          if (stats.length) {
            gsap.fromTo(stats, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: stats[0], start: 'top 88%' } })
          }

          ScrollTrigger.refresh()
        }, compareRef.current)
      } catch (error) {
        console.error('Error animando comparativa sistemas-a-medida:', error)
      }
    }

    setupCompareAnimations()

    return () => {
      if (ctx?.revert) ctx.revert()
    }
  }, [])

  const handleContact = () => {
    const message = language === 'es'
      ? 'Hola, quiero evaluar un sistema a medida para mi operación. ¿Podemos iniciar un diagnóstico?'
      : 'Hi, I want to evaluate a custom system for my operations. Can we start with a diagnostic call?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
              {t('systems_page_title', 'Software a tu medida, sin errores ni retrabajos', 'Tailored software, without errors or rework')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              La mayoría de los sistemas SaaS del mercado son soluciones genéricas: funcionan aceptablemente para miles de empresas distintas, pero no están pensadas al 100% para ninguna en particular. El resultado es que terminás adaptando tu operación a las limitaciones del software, y no al revés. Con un sistema a medida, partimos de cómo trabajás hoy y construimos exactamente lo que tu negocio necesita, sin funciones de relleno ni procesos engorrosos.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
            <Image src="/images/features/ilustrativa.webp" alt={t('systems_hero_image_alt', 'Equipo revisando indicadores en un dashboard de gestion', 'Team reviewing performance indicators on a management dashboard')} width={1536} height={1024} className="w-full h-auto object-cover" priority />
          </div>
        </div>

        <div ref={compareRef} className="mb-20">
          <div className="systems-compare-header text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">¿Por qué un sistema a medida?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
              Descubrí las diferencias clave entre depender de un SaaS genérico o invertir en tecnología diseñada específicamente para tu operación.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="systems-compare-card will-change-transform rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-7 py-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">SaaS Genérico</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">La solución que no fue pensada para vos</p>
              <ul className="space-y-4">
                {SAAS_CONS.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-center">
                      <i className="ri-close-line text-red-500 dark:text-red-400 text-xs"></i>
                    </span>
                    <div>
                      <p className="font-semibold text-slate-600 dark:text-slate-300 text-sm leading-snug">{item.title}</p>
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="systems-compare-card will-change-transform relative rounded-2xl border-2 border-teal-400/50 dark:border-teal-500/30 bg-white dark:bg-slate-950 px-7 py-7 shadow-md dark:shadow-none">
              <span className="absolute -top-3 left-6 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
                Recomendado
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-0.5">Sistema a Medida</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">Tecnología diseñada para tu operación</p>
              <ul className="space-y-4 mb-8">
                {MEDIDA_PROS.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-center justify-center">
                      <i className="ri-check-line text-teal-600 dark:text-teal-400 text-xs"></i>
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug">{item.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleContact} className="w-full rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm py-3 transition-colors duration-200">
                Hablemos de tu proyecto →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COMPARE_STATS.map((stat) => (
              <div key={stat.value} className="systems-compare-stat rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 text-center">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {FEATURE_CARDS.map((card) => {
            const style = CARD_STYLES[card.tone] || CARD_STYLES.blue
            return (
              <FeatureWaveCard
                key={card.id}
                animationNamespace="systems"
                className={style.wrap}
                badgeClassName={style.badge}
                iconClassName={style.icon}
                buttonClassName={style.cta}
                icon={card.icon}
                title={language === 'es' ? card.titleEs : card.titleEn}
                description={language === 'es' ? card.textEs : card.textEn}
                ctaLabel={language === 'es' ? card.ctaEs : card.ctaEn}
                onCtaClick={handleContact}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
