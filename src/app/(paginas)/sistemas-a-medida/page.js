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
    textEs: 'Si tu equipo repite tareas manuales y pierde horas valiosas, este sistema es para vos.',
    textEn: 'If your team repeats manual tasks and loses valuable hours, this system is for you.',
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
    badge: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-[#1b1308] dark:border-[#3b2410] dark:text-amber-200',
    icon: 'text-amber-700 bg-amber-100 border-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-amber-400 dark:bg-[#271608] dark:border-[#4a2b0f]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
  emerald: {
    wrap: 'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 pt-5 pb-16 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] hover:border-slate-300 dark:border-slate-800 dark:bg-[#05070d] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] dark:hover:border-slate-700',
    badge: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-[#1b1308] dark:border-[#3b2410] dark:text-amber-200',
    icon: 'text-amber-700 bg-amber-100 border-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-amber-400 dark:bg-[#271608] dark:border-[#4a2b0f]',
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
    badge: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-[#1b1308] dark:border-[#3b2410] dark:text-amber-200',
    icon: 'text-amber-700 bg-amber-100 border-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-amber-400 dark:bg-[#271608] dark:border-[#4a2b0f]',
    cta: 'rounded-full px-6 py-2.5 font-semibold transition-transform duration-300 group-hover:-translate-y-0.5',
  },
}

export default function SistemasPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const cardsGridRef = useRef(null)

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

          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 30, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.14,
              ease: 'power2.out',
            }
          )

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
              {t(
                'systems_page_intro',
                'Diseñamos software en función de tus procesos, no al revés. Cuando la operación depende de Excel para tareas críticas, suelen aparecer demoras, riesgos de seguridad y menor trazabilidad. El objetivo es reducir errores, ahorrar tiempo y mejorar el control operativo.',
                'We design software around your processes, not the other way around. When critical operations rely on Excel, delays, security risks, and limited traceability often appear. The goal is to reduce errors, save time, and improve operational control.'
              )}
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
            <Image
              src="/images/features/ilustrativa.webp"
              alt={t(
                'systems_hero_image_alt',
                'Equipo revisando indicadores en un dashboard de gestion',
                'Team reviewing performance indicators on a management dashboard'
              )}
              width={1536}
              height={1024}
              className="w-full h-auto object-cover"
              priority
            />
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
