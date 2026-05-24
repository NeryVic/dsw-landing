'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'
import { PILLARS, SOLUTIONS, USE_CASES } from '@/data/services'
import pricingData from '@/data/pricing.json'

const WEB_SOLUTION_PRICES = [
  pricingData.services.landing.desde,
  pricingData.services.web_institucional.desde,
  pricingData.services.ecommerce.desde,
]

const USE_CASE_ACCENT = {
  blue: 'border-blue-200 bg-blue-50/60 dark:border-blue-900/50 dark:bg-blue-950/20',
  teal: 'border-teal-200 bg-teal-50/60 dark:border-teal-900/50 dark:bg-teal-950/20',
  amber: 'border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20',
  slate: 'border-slate-300 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-900/40',
}

const USE_CASE_ICON_ACCENT = {
  blue: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-950/40 dark:border-blue-900/50',
  teal: 'text-teal-600 bg-teal-100 border-teal-200 dark:text-teal-300 dark:bg-teal-950/40 dark:border-teal-900/50',
  amber: 'text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-900/50',
  slate: 'text-slate-700 bg-slate-200 border-slate-300 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700',
}

const PILLAR_ACCENT = {
  blue: {
    tab: 'border-blue-400 bg-blue-100 text-blue-900 ring-1 ring-blue-300 shadow-lg shadow-blue-900/10 dark:border-blue-400/60 dark:bg-blue-900/35 dark:text-blue-100 dark:ring-blue-400/30 dark:shadow-blue-950/30',
    soft: 'bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/40',
    dot: 'text-blue-600 dark:text-blue-300',
  },
  teal: {
    tab: 'border-teal-400 bg-teal-100 text-teal-900 ring-1 ring-teal-300 shadow-lg shadow-teal-900/10 dark:border-teal-400/60 dark:bg-teal-900/35 dark:text-teal-100 dark:ring-teal-400/30 dark:shadow-teal-950/30',
    soft: 'bg-teal-50 border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40',
    dot: 'text-teal-600 dark:text-teal-300',
  },
  amber: {
    tab: 'border-amber-400 bg-amber-100 text-amber-900 ring-1 ring-amber-300 shadow-lg shadow-amber-900/10 dark:border-amber-400/60 dark:bg-amber-900/35 dark:text-amber-100 dark:ring-amber-400/30 dark:shadow-amber-950/30',
    soft: 'bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/40',
    dot: 'text-amber-600 dark:text-amber-300',
  },
}

export default function ServiciosPageClient() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()
  const [activePillar, setActivePillar] = useState('web')
  const cardsRef = useRef(null)
  const motionScopeRef = useRef(null)
  const mobileSolutionsRef = useRef(null)
  const desktopSolutionsRef = useRef(null)
  const useCasesRef = useRef(null)
  const finalCtaRef = useRef(null)
  const switchTrackRef = useRef(null)
  const switchIndicatorRef = useRef(null)
  const prevPillarIndexRef = useRef(null)

  const activePillarIndex = Math.max(PILLARS.findIndex((pillar) => pillar.id === activePillar), 0)
  const activePillarData = PILLARS.find((pillar) => pillar.id === activePillar) || PILLARS[0]
  const activeSolutions = SOLUTIONS[activePillar] || []
  const accents = PILLAR_ACCENT[activePillarData.accent]
  const isWebPillar = activePillar === 'web'
  const featureRows = useMemo(() => {
    const all = activeSolutions.flatMap((solution) => (language === 'es' ? solution.includesEs : solution.includesEn))
    return Array.from(new Set(all))
  }, [activeSolutions, language])
  const cumulativeFeatureSets = useMemo(() => {
    const progressiveSet = new Set()
    return activeSolutions.map((solution) => {
      const includes = language === 'es' ? solution.includesEs : solution.includesEn
      includes.forEach((item) => progressiveSet.add(item))
      return new Set(progressiveSet)
    })
  }, [activeSolutions, language])

  const getText = (item, esKey, enKey) => (language === 'es' ? item[esKey] : item[enKey])

  const scrollToSolutions = () => {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQuote = () => {
    const message = language === 'es'
      ? 'Hola, quiero cotizar sus servicios para mi empresa. ¿Podemos agendar una llamada breve?'
      : 'Hi, I want to get a quote for your services for my company. Can we schedule a short call?'
    openWhatsApp(undefined, message)
  }

  const handleCardCta = (cardTitle) => {
    const message = language === 'es'
      ? `Hola, me interesa ${cardTitle}. Quiero una recomendacion para mi negocio.`
      : `Hi, I'm interested in ${cardTitle}. I want the best recommendation for my business.`
    openWhatsApp(undefined, message)
  }

  const handleUseCaseCta = (useCaseTitle) => {
    const message = language === 'es'
      ? `Hola, quiero esta solucion: ${useCaseTitle}. ¿Podemos hablar?`
      : `Hi, I want this solution: ${useCaseTitle}. Can we talk?`
    openWhatsApp(undefined, message)
  }

  useEffect(() => {
    let ctx = null
    let cancelled = false

    async function animatePillarChange() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        if (cancelled || !motionScopeRef.current) return

        ctx = gsapLib.context(() => {
          const indicatorEl = switchIndicatorRef.current
          const trackEl = switchTrackRef.current
          const targetTab = trackEl?.querySelector(`[data-pill-index="${activePillarIndex}"]`)

          let direction = 1

          if (indicatorEl && trackEl && targetTab) {
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const previousIndex = prevPillarIndexRef.current

            const trackRect = trackEl.getBoundingClientRect()
            const targetRect = targetTab.getBoundingClientRect()
            const targetX = targetRect.left - trackRect.left
            const targetWidth = targetRect.width

            const currentX = Number(gsapLib.getProperty(indicatorEl, 'x')) || 0
            const distance = Math.abs(targetX - currentX)
            const stretch = Math.min(1.16, 1 + distance / 580)
            direction = targetX > currentX ? 1 : -1

            if (reducedMotion || previousIndex === null || previousIndex === activePillarIndex) {
              gsapLib.set(indicatorEl, { x: targetX, width: targetWidth, scaleX: 1 })
            } else {
              gsapLib.killTweensOf(indicatorEl)

              gsapLib.timeline({ defaults: { overwrite: 'auto' } })
                .set(indicatorEl, {
                  transformOrigin: direction > 0 ? 'left center' : 'right center',
                  force3D: true,
                })
                .to(indicatorEl, { scaleX: stretch, duration: 0.11, ease: 'sine.out' }, 0)
                .to(indicatorEl, { x: targetX, width: targetWidth, duration: 0.46, ease: 'power3.inOut' }, 0)
                .to(indicatorEl, { scaleX: 1, duration: 0.2, ease: 'back.out(1.8)' }, 0.13)
            }

            if (!reducedMotion && previousIndex !== null && previousIndex !== activePillarIndex) {
              const newTabIcon = targetTab.querySelector('i')
              if (newTabIcon) {
                gsapLib.fromTo(
                  newTabIcon,
                  { scale: 0.55, rotate: direction * -20 },
                  { scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(2.4)' }
                )
              }
              gsapLib.fromTo(
                targetTab,
                { scale: 0.88 },
                { scale: 1, duration: 0.4, ease: 'back.out(2.8)', clearProps: 'scale' }
              )
            }
          }

          const activeTab = motionScopeRef.current.querySelector('[role="tab"][aria-selected="true"]')
          const activePanel = motionScopeRef.current.querySelector('[role="tabpanel"]:not([hidden])')
          const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
          const activeContainer = isDesktop ? desktopSolutionsRef.current : mobileSolutionsRef.current
          const visibleCards = activeContainer
            ? Array.from(activeContainer.querySelectorAll('[data-solution-card]')).filter((el) => el.offsetParent !== null)
            : []

          const tl = gsapLib.timeline({ defaults: { ease: 'power2.out' } })

          if (activeTab) {
            tl.fromTo(activeTab, { scale: 0.97 }, { scale: 1, duration: 0.28, clearProps: 'scale' }, 0)
          }

          if (activePanel) {
            tl.fromTo(
              activePanel,
              { autoAlpha: 0, x: direction * 24, y: 8 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
              0.05
            )
          }

          if (visibleCards.length > 0) {
            tl.fromTo(
              visibleCards,
              { autoAlpha: 0, x: direction * 16, y: 18 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.42, stagger: 0.07, ease: 'power2.out', clearProps: 'opacity,visibility,transform' },
              0.08
            )
          }
        }, motionScopeRef.current)

        prevPillarIndexRef.current = activePillarIndex
      } catch (err) {}
    }

    const raf = requestAnimationFrame(() => animatePillarChange())

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      try { ctx?.revert() } catch (e) {}
    }
  }, [activePillar, language])

  useEffect(() => {
    let ctx = null
    let cancelled = false

    async function initScrollAnimations() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod
        const stMod = await import('gsap/dist/ScrollTrigger')
        const ScrollTrigger = stMod.default ?? stMod
        if (cancelled) return
        gsapLib.registerPlugin(ScrollTrigger)

        ctx = gsapLib.context(() => {
          const useCaseCards = useCasesRef.current
            ? Array.from(useCasesRef.current.querySelectorAll('[data-use-case-card]'))
            : []

          if (useCaseCards.length > 0) {
            gsapLib.fromTo(
              useCaseCards,
              { autoAlpha: 0, y: 24, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: {
                  trigger: useCasesRef.current,
                  start: 'top 82%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          }

          if (finalCtaRef.current) {
            gsapLib.fromTo(
              finalCtaRef.current,
              { autoAlpha: 0, y: 26 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: {
                  trigger: finalCtaRef.current,
                  start: 'top 86%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          }
        })

        ScrollTrigger.refresh()
      } catch (err) {}
    }

    const raf = requestAnimationFrame(() => initScrollAnimations())

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      try { ctx?.revert() } catch (e) {}
    }
  }, [language])

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
              {t('services_page_title', 'Soluciones de Alto Impacto para Empresas', 'High-Impact Solutions for Companies')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {t('services_page_subtitle', 'Elegi la solucion segun tu objetivo: captar mas clientes, ordenar procesos internos o mantener tu infraestructura estable.', 'Choose the solution based on your goal: get more clients, improve internal processes, or keep your infrastructure stable.')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={handleQuote} size="lg">
                {t('services_hero_cta_primary', 'Solicitar diagnostico', 'Request diagnostic call')}
              </Button>
              <Button onClick={scrollToSolutions} size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
                {t('services_hero_cta_secondary', 'Ver soluciones', 'View solutions')}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Image
                src="/images/features/comotrab.webp"
                alt={t('services_hero_image_alt', 'Equipo trabajando en planificacion y mejora de procesos', 'Team working on planning and process improvement')}
                width={1536}
                height={1024}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 backdrop-blur px-4 py-3 shadow-lg">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {t('services_hero_visual_kicker', 'Metodo de trabajo', 'Work method')}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {t('services_hero_visual_label', 'Diagnostico -> Implementacion -> Soporte', 'Diagnostic -> Implementation -> Support')}
              </p>
            </div>
          </div>
        </div>

        <div ref={motionScopeRef}>
          <Tab.Group selectedIndex={activePillarIndex} onChange={(index) => setActivePillar(PILLARS[index]?.id || PILLARS[0].id)}>
            <div className="mb-2 text-center">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-900/60 px-3 py-1 text-[11px] font-medium tracking-normal text-slate-600 dark:text-slate-400">
                <i className="ri-cursor-line text-[11px] opacity-70"></i>
                {t('services_switch_hint', 'Selecciona una solución', 'Select a solution')}
              </span>
            </div>
            <Tab.List className="mb-8" ref={cardsRef}>
              <div className="max-w-3xl mx-auto rounded-full border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/80 p-1 shadow-sm">
                <div ref={switchTrackRef} className="relative grid grid-cols-3 gap-1">
                  <span aria-hidden="true" ref={switchIndicatorRef} className="absolute top-0 bottom-0 left-0 rounded-full bg-blue-600 dark:bg-blue-500 shadow-lg shadow-blue-900/25" style={{ width: `${100 / PILLARS.length}%` }} />
                  {PILLARS.map((pillar, index) => (
                    <Tab key={pillar.id} data-pill-index={index} className={({ selected }) => `relative z-10 flex items-center justify-center gap-2 rounded-full px-3 py-3 text-xs sm:text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${selected ? 'text-white' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                      <i className={`${pillar.icon} text-base`}></i>
                      <span className="truncate">{getText(pillar, 'labelEs', 'labelEn')}</span>
                    </Tab>
                  ))}
                </div>
              </div>
            </Tab.List>

            <Tab.Panels className="mb-12">
              {PILLARS.map((pillar) => {
                const panelAccent = PILLAR_ACCENT[pillar.accent]
                return (
                  <Tab.Panel key={pillar.id} className="focus:outline-none">
                    <div className={`rounded-xl border p-5 sm:p-6 ${panelAccent.soft}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${pillar.icon} text-xl ${panelAccent.dot}`}></i>
                        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                          {getText(pillar, 'labelEs', 'labelEn')}
                        </h2>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                        {getText(pillar, 'focusEs', 'focusEn')}
                      </p>
                    </div>
                  </Tab.Panel>
                )
              })}
            </Tab.Panels>
          </Tab.Group>

          <div ref={mobileSolutionsRef} className="md:hidden -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory mb-12">
            {activeSolutions.map((solution, index) => {
              if (isWebPillar) {
                return (
                  <article key={solution.titleEs} data-solution-card className="snap-start min-w-[88%] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-7">
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{getText(solution, 'titleEs', 'titleEn')}</h3>
                      <p className="text-2xl font-bold mb-1">
                        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">{t('services_desde', 'desde', 'from')} </span>
                        <span className={index === 0 ? 'text-amber-500' : index === 1 ? 'text-emerald-500' : 'text-blue-500'}>${WEB_SOLUTION_PRICES[index]}</span>
                        <span className="text-sm font-normal text-slate-500 dark:text-slate-400"> USD</span>
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{getText(solution, 'timelineEs', 'timelineEn')}</p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 text-center">{getText(solution, 'descEs', 'descEn')}</p>
                    <ul className="space-y-3 mb-6">
                      {featureRows.map((feature) => {
                        const included = cumulativeFeatureSets[index]?.has(feature)
                        return (
                          <li key={`${solution.titleEs}-${feature}`} className={`flex items-start gap-3 text-sm ${included ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                            <i className={`${included ? 'ri-check-line' : 'ri-close-line'} mt-0.5`}></i>
                            <span>{feature}</span>
                          </li>
                        )
                      })}
                    </ul>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 text-center"><span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}</p>
                    <Button onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))} className="w-full rounded-full">
                      {getText(solution, 'ctaEs', 'ctaEn')}
                    </Button>
                  </article>
                )
              }

              const audience = language === 'es' ? solution.audienceEs : solution.audienceEn
              const includes = language === 'es' ? solution.includesEs : solution.includesEn
              return (
                <article key={solution.titleEs} data-solution-card className="snap-start min-w-[88%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${USE_CASE_ICON_ACCENT[activePillarData.accent] || USE_CASE_ICON_ACCENT.slate}`}>
                      <i className={solution.icon || activePillarData.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">{getText(solution, 'titleEs', 'titleEn')}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{getText(solution, 'timelineEs', 'timelineEn')}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {audience.map((aud) => (
                      <span key={aud} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{aud}</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{getText(solution, 'descEs', 'descEn')}</p>
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {includes.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                        <i className={`ri-check-line mt-0.5 ${accents.dot}`}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-5"><span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}</p>
                  <Button onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))} className="w-full rounded-full">{getText(solution, 'ctaEs', 'ctaEn')}</Button>
                  {solution.showPlans && (
                    <Link href="/soporte#planes" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                      <i className="ri-price-tag-3-line text-sm" />
                      {t('services_support_see_plans', 'Ver planes', 'View plans')}
                      <i className="ri-arrow-right-line text-xs" />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>

          <div ref={desktopSolutionsRef} className={`hidden mb-12 ${isWebPillar ? 'md:flex md:flex-col lg:flex-row md:items-stretch md:justify-center gap-5 lg:gap-0' : 'md:grid md:grid-cols-3 gap-5'}`}>
            {activeSolutions.map((solution, index) => {
              if (isWebPillar) {
                return (
                  <article key={solution.titleEs} data-solution-card className={`w-full max-w-sm border-2 rounded-3xl p-8 flex flex-col bg-white dark:bg-slate-900 ${index === 1 ? 'border-dashed border-slate-300 dark:border-slate-700 lg:py-12 lg:z-10' : 'border-slate-200 dark:border-slate-800'} ${index === 0 ? 'lg:-mr-4' : ''} ${index === 2 ? 'lg:-ml-4' : ''}`}>
                    <div className="mb-8 text-center">
                      {index === 1 ? <p className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500 mb-2">{t('services_recommended', 'Recomendada', 'Recommended')}</p> : null}
                      <h3 className={`font-semibold mb-3 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-emerald-500' : 'text-blue-500'} text-2xl`}>{getText(solution, 'titleEs', 'titleEn')}</h3>
                      <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-none mb-2">{index === 0 ? '01' : index === 1 ? '02' : '03'}</p>
                      <p className="text-xl font-bold mb-1"><span className="text-sm font-normal text-slate-500 dark:text-slate-400">{t('services_desde', 'desde', 'from')} </span><span className={index === 0 ? 'text-amber-500' : index === 1 ? 'text-emerald-500' : 'text-blue-500'}>${WEB_SOLUTION_PRICES[index]}</span><span className="text-sm font-normal text-slate-500 dark:text-slate-400"> USD</span></p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{getText(solution, 'timelineEs', 'timelineEn')}</p>
                    </div>
                    <ul className="space-y-4 mb-8 min-h-[290px]">
                      {featureRows.map((feature) => {
                        const included = cumulativeFeatureSets[index]?.has(feature)
                        return (
                          <li key={`${solution.titleEs}-${feature}`} className={`flex items-start gap-3 text-base ${included ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                            <i className={`${included ? 'ri-check-line' : 'ri-close-line'} mt-0.5`}></i>
                            <span>{feature}</span>
                          </li>
                        )
                      })}
                    </ul>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 text-center"><span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}</p>
                    <Button onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))} className={`mt-auto rounded-full ${index === 1 ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white' : 'border-slate-400 text-slate-900  hover:bg-blue-300 hover:border-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-blue-900'}`} variant={index === 1 ? 'primary' : 'outline'}>{getText(solution, 'ctaEs', 'ctaEn')}</Button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">{index === 1 ? t('services_plan_note_mid', 'Ideal para equipos que necesitan avanzar rapido.', 'Best for teams that need to move fast.') : t('services_plan_note_side', 'Disenado para objetivos concretos y medibles.', 'Designed for concrete and measurable goals.')}</p>
                  </article>
                )
              }

              const audience = language === 'es' ? solution.audienceEs : solution.audienceEn
              const includes = language === 'es' ? solution.includesEs : solution.includesEn
              return (
                <article key={solution.titleEs} data-solution-card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${USE_CASE_ICON_ACCENT[activePillarData.accent] || USE_CASE_ICON_ACCENT.slate}`}>
                      <i className={solution.icon || activePillarData.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">{getText(solution, 'titleEs', 'titleEn')}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{getText(solution, 'timelineEs', 'timelineEn')}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {audience.map((aud) => (
                      <span key={aud} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{aud}</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">{getText(solution, 'descEs', 'descEn')}</p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {includes.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                        <i className={`ri-check-line mt-0.5 ${accents.dot}`}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-6"><span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}</p>
                  <Button onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))} variant="outline" className="mt-auto rounded-full border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">{getText(solution, 'ctaEs', 'ctaEn')}</Button>
                  {solution.showPlans && (
                    <Link href="/soporte#planes" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                      <i className="ri-price-tag-3-line text-sm" />
                      {t('services_support_see_plans', 'Ver planes', 'View plans')}
                      <i className="ri-arrow-right-line text-xs" />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>

          {activePillar === 'systems' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 px-5 py-4 rounded-xl border border-teal-200 bg-teal-50/60 dark:border-teal-900/40 dark:bg-teal-950/20">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('services_custom_note_title', '¿Tu operacion no está en esta lista?', "Your operation isn't listed here?")}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('services_custom_note_desc', 'Estos son los mas pedidos por nuestros clientes. Tambien desarrollamos sistemas a medida segun tu rubro, proceso o flujo de trabajo.', 'These are our most requested systems. We also build custom solutions tailored to your industry, process, or workflow.')}</p>
                </div>
              </div>
              <Button size="sm" onClick={() => { const message = language === 'es' ? 'Hola, necesito un sistema a medida para mi negocio. ¿Podemos hablar?' : 'Hi, I need a custom system for my business. Can we talk?' ; openWhatsApp(undefined, message) }} variant="outline" className="shrink-0 rounded-full border-teal-400 text-teal-700 hover:bg-teal-100 dark:border-teal-600 dark:text-teal-300 dark:hover:bg-teal-950/40">{t('services_custom_note_cta', 'Contanos tu caso', 'Tell us your case')}</Button>
            </div>
          )}
        </div>

        <div ref={useCasesRef} className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">{t('services_use_cases_title', 'Casos de uso por sector', 'Use Cases by Sector')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {USE_CASES.map((item) => (
              <article key={item.titleEs} data-use-case-card className={`border rounded-2xl p-6 shadow-sm ${USE_CASE_ACCENT[item.accent] || USE_CASE_ACCENT.slate}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl shrink-0 ${USE_CASE_ICON_ACCENT[item.accent] || USE_CASE_ICON_ACCENT.slate}`}>
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold leading-tight text-slate-900 dark:text-slate-100">{getText(item, 'titleEs', 'titleEn')}</h4>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2"><span className="font-semibold">{t('services_case_problem', 'Problema', 'Problem')}:</span> {getText(item, 'problemEs', 'problemEn')}</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2"><span className="font-semibold">{t('services_case_solution', 'Solucion', 'Solution')}:</span> {getText(item, 'solutionEs', 'solutionEn')}</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4"><span className="font-semibold">{t('services_case_result', 'Resultado esperado', 'Expected result')}:</span> {getText(item, 'resultEs', 'resultEn')}</p>
                <p className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-slate-300 dark:border-slate-700 pl-3 mb-4">{getText(item, 'testimonialEs', 'testimonialEn')}</p>
                <Button size="sm" onClick={() => handleUseCaseCta(getText(item, 'titleEs', 'titleEn'))} className="rounded-full">{t('services_case_cta', 'Quiero esta solucion', 'I want this solution')}</Button>
              </article>
            ))}
          </div>
        </div>

        <div ref={finalCtaRef} className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">{t('services_page_cta_title', 'No estas seguro de que solucion te conviene?', 'Not sure what solution fits best?')}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{t('services_page_cta_desc', 'Hacemos un diagnostico breve de tu situacion actual y te recomendamos el camino con mejor retorno.', 'We run a short diagnostic and recommend the best path for your current stage.')}</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleQuote} size="lg">{t('services_page_cta_btn', 'Solicitar diagnostico', 'Request diagnostic call')}</Button>
            <Button onClick={() => { const message = language === 'es' ? 'Hola, quiero hablar por WhatsApp para definir que solucion me conviene.' : 'Hi, I want to talk on WhatsApp to define what solution fits me best.'; openWhatsApp(undefined, message) }} size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">{t('services_page_cta_btn_secondary', 'Hablar por WhatsApp', 'Talk on WhatsApp')}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
