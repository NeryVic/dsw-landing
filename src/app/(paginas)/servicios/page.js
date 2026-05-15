'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

const PILLARS = [
  {
    id: 'web',
    icon: 'ri-layout-4-line',
    labelEs: 'Desarrollo Web',
    labelEn: 'Web Development',
    focusEs: 'Presencia, captacion y ventas online.',
    focusEn: 'Presence, lead generation, and online sales.',
    accent: 'blue',
  },
  {
    id: 'systems',
    icon: 'ri-settings-4-line',
    labelEs: 'Desarrollo de Sistemas',
    labelEn: 'Systems Development',
    focusEs: 'Control operativo y automatizacion.',
    focusEn: 'Operational control and automation.',
    accent: 'teal',
  },
  {
    id: 'support',
    icon: 'ri-tools-line',
    labelEs: 'Soporte y Redes para Pymes',
    labelEn: 'Support and Networks for SMBs',
    focusEs: 'Continuidad tecnica y estabilidad diaria.',
    focusEn: 'Technical continuity and daily stability.',
    accent: 'amber',
  },
]

const SOLUTIONS = {
  web: [
    {
      titleEs: 'Landing Page de Conversion',
      titleEn: 'Conversion Landing Page',
      descEs: 'Pagina enfocada en captar consultas y leads para una oferta puntual.',
      descEn: 'A page focused on generating leads for a specific offer.',
      audienceEs: ['Lanzamientos de servicios', 'Campanas de anuncios', 'Equipos comerciales'],
      audienceEn: ['Service launches', 'Ad campaigns', 'Sales teams'],
      includesEs: ['Estructura orientada a conversion', 'Integracion con WhatsApp y formulario', 'SEO tecnico base', 'Version mobile optimizada', 'Medicion de eventos y conversiones'],
      includesEn: ['Conversion-driven structure', 'WhatsApp and form integration', 'Technical SEO baseline', 'Mobile-first optimization', 'Event and conversion tracking'],
      outcomeEs: 'Mas consultas con menor friccion.',
      outcomeEn: 'More inquiries with less friction.',
      timelineEs: '1 a 2 semanas',
      timelineEn: '1 to 2 weeks',
      ctaEs: 'Quiero mi landing',
      ctaEn: 'I want my landing page',
    },
    {
      titleEs: 'Web Institucional Profesional',
      titleEn: 'Professional Corporate Website',
      descEs: 'Sitio corporativo para comunicar valor, servicios y respaldo de marca.',
      descEn: 'A corporate site to communicate value, services, and brand trust.',
      audienceEs: ['Empresas B2B', 'Estudios profesionales', 'Pymes con web desactualizada'],
      audienceEn: ['B2B companies', 'Professional firms', 'SMBs with outdated websites'],
      includesEs: ['Arquitectura por secciones', 'Diseno alineado a marca', 'Paginas de servicios y contacto', 'SEO on-page', 'CTAs y formularios listos para captar'],
      includesEn: ['Section-based structure', 'Brand-aligned design', 'Services and contact pages', 'On-page SEO', 'Lead-ready CTAs and forms'],
      outcomeEs: 'Mas confianza comercial y mejor posicionamiento.',
      outcomeEn: 'Higher trust and stronger positioning.',
      timelineEs: '2 a 4 semanas',
      timelineEn: '2 to 4 weeks',
      ctaEs: 'Quiero una web institucional',
      ctaEn: 'I want a corporate website',
    },
    {
      titleEs: 'Ecommerce 24/7',
      titleEn: '24/7 Ecommerce',
      descEs: 'Tienda online para vender productos con catalogo, carrito y cobros.',
      descEn: 'An online store to sell products with catalog, cart, and payments.',
      audienceEs: ['Comercios con tienda fisica', 'Marcas de catalogo', 'Negocios en expansion'],
      audienceEn: ['Retail stores', 'Catalog brands', 'Growing businesses'],
      includesEs: ['Catalogo y categorias', 'Carrito y checkout', 'Pagos y envios', 'Gestion de stock', 'Seguimiento comercial'],
      includesEn: ['Catalog and categories', 'Cart and checkout', 'Payments and shipping', 'Stock management', 'Sales tracking setup'],
      outcomeEs: 'Canal de venta digital activo todo el dia.',
      outcomeEn: 'An always-on digital sales channel.',
      timelineEs: '3 a 6 semanas',
      timelineEn: '3 to 6 weeks',
      ctaEs: 'Quiero vender 24/7',
      ctaEn: 'I want to sell 24/7',
    },
  ],
  systems: [
    {
      titleEs: 'Sistema POS',
      titleEn: 'POS System',
      descEs: 'Sistema de ventas con control de caja, productos y reportes diarios.',
      descEn: 'Sales system with cash control, products, and daily reports.',
      audienceEs: ['Comercios minoristas', 'Locales con varios vendedores', 'Negocios con carga manual'],
      audienceEn: ['Retail stores', 'Multi-seller shops', 'Manually-managed businesses'],
      includesEs: ['Gestion de productos y precios', 'Registro de ventas y arqueo', 'Reportes por turno y dia', 'Roles de usuarios', 'Base para futuras integraciones'],
      includesEn: ['Product and pricing management', 'Sales and cash register logs', 'Shift and daily reports', 'User roles', 'Integration-ready foundation'],
      outcomeEs: 'Mas control operativo y menos errores manuales.',
      outcomeEn: 'More operational control and fewer manual errors.',
      timelineEs: '4 a 8 semanas',
      timelineEn: '4 to 8 weeks',
      ctaEs: 'Quiero evaluar un POS',
      ctaEn: 'I want to evaluate a POS',
    },
    {
      titleEs: 'Sistema LMS para Prestamos',
      titleEn: 'Loan Management System',
      descEs: 'Plataforma para gestionar alta, cuotas, cobranza y estado de cartera.',
      descEn: 'Platform to manage onboarding, installments, collections, and portfolio status.',
      audienceEs: ['Financieras pequenas', 'Mutuales', 'Operadores de credito'],
      audienceEn: ['Small finance firms', 'Mutual entities', 'Credit operators'],
      includesEs: ['Alta de clientes y prestamos', 'Planes y calendario de cuotas', 'Estado de cuenta y mora', 'Reportes de cartera', 'Base para recordatorios automaticos'],
      includesEn: ['Customer and loan onboarding', 'Installment plans and calendars', 'Account status and arrears', 'Portfolio reports', 'Automated reminder foundation'],
      outcomeEs: 'Menos retrabajo y mas control de cobranzas.',
      outcomeEn: 'Less rework and tighter collection control.',
      timelineEs: '6 a 10 semanas',
      timelineEn: '6 to 10 weeks',
      ctaEs: 'Quiero un LMS de prestamos',
      ctaEn: 'I want a loan LMS',
    },
    {
      titleEs: 'Sistema de Citas para Clinicas',
      titleEn: 'Clinic Appointment System',
      descEs: 'Agenda de turnos con recordatorios y seguimiento por profesional.',
      descEn: 'Appointment scheduling with reminders and practitioner tracking.',
      audienceEs: ['Odontologos', 'Clinicas pequenas/medianas', 'Consultorios con agenda saturada'],
      audienceEn: ['Dentists', 'Small/medium clinics', 'Busy medical practices'],
      includesEs: ['Agenda por profesional', 'Confirmaciones y recordatorios', 'Gestion de pacientes', 'Estados de atencion', 'Reportes operativos'],
      includesEn: ['Schedule by practitioner', 'Confirmations and reminders', 'Patient management', 'Care status tracking', 'Operational reporting'],
      outcomeEs: 'Menos ausencias y agenda mejor organizada.',
      outcomeEn: 'Fewer no-shows and better scheduling flow.',
      timelineEs: '4 a 8 semanas',
      timelineEn: '4 to 8 weeks',
      ctaEs: 'Quiero un sistema de citas',
      ctaEn: 'I want an appointment system',
    },
  ],
  support: [
    {
      titleEs: 'Mantenimiento de PCs para Pymes',
      titleEn: 'PC Maintenance for SMBs',
      descEs: 'Soporte preventivo y correctivo para equipos de trabajo.',
      descEn: 'Preventive and corrective support for workstations.',
      audienceEs: ['Pymes con varios puestos', 'Empresas sin area IT', 'Equipos con fallas frecuentes'],
      audienceEn: ['SMBs with many stations', 'Teams without IT area', 'Frequent breakdown environments'],
      includesEs: ['Diagnostico y mantenimiento preventivo', 'Limpieza logica y fisica', 'Actualizaciones y seguridad', 'Resolucion de incidencias'],
      includesEn: ['Diagnostics and preventive maintenance', 'Software and hardware cleanup', 'Updates and security hardening', 'Incident resolution'],
      outcomeEs: 'Menos interrupciones y mayor rendimiento diario.',
      outcomeEn: 'Fewer interruptions and better daily performance.',
      timelineEs: 'Plan mensual o demanda',
      timelineEn: 'Monthly plan or on-demand',
      ctaEs: 'Necesito mantenimiento',
      ctaEn: 'I need maintenance',
    },
    {
      titleEs: 'Administracion de Redes y WiFi',
      titleEn: 'Network and WiFi Administration',
      descEs: 'Diseno y estabilizacion de red para continuidad operativa.',
      descEn: 'Network design and stabilization for operational continuity.',
      audienceEs: ['Oficinas con cortes', 'Locales con mala cobertura', 'Pymes en crecimiento'],
      audienceEn: ['Offices with outages', 'Venues with poor coverage', 'Growing SMBs'],
      includesEs: ['Revision de topologia de red', 'Segmentacion y seguridad basica', 'Mejora de cobertura WiFi', 'Monitoreo y ajustes'],
      includesEn: ['Network topology review', 'Segmentation and baseline security', 'WiFi coverage improvements', 'Monitoring and tuning'],
      outcomeEs: 'Conectividad mas estable y segura.',
      outcomeEn: 'More stable and secure connectivity.',
      timelineEs: 'Implementacion + mantenimiento',
      timelineEn: 'Implementation + maintenance',
      ctaEs: 'Quiero mejorar mi red',
      ctaEn: 'I want to improve my network',
    },
    {
      titleEs: 'Plan de Soporte Mensual IT',
      titleEn: 'Monthly IT Support Plan',
      descEs: 'Acompanamiento tecnico continuo con prioridades y seguimiento.',
      descEn: 'Continuous support with priorities and tracking.',
      audienceEs: ['Empresas que priorizan continuidad', 'Equipos que no pueden frenar por fallas'],
      audienceEn: ['Continuity-driven businesses', 'Teams that cannot stop due to failures'],
      includesEs: ['Mesa de ayuda', 'Priorizacion de tickets', 'Visitas programadas', 'Reporte mensual'],
      includesEn: ['Help desk', 'Ticket prioritization', 'Scheduled visits', 'Monthly report'],
      outcomeEs: 'Predictibilidad tecnica y respuesta clara.',
      outcomeEn: 'Technical predictability and clear response times.',
      timelineEs: 'Suscripcion mensual',
      timelineEn: 'Monthly subscription',
      ctaEs: 'Quiero soporte mensual',
      ctaEn: 'I want monthly support',
    },
  ],
}

const USE_CASES = [
  {
    titleEs: 'Mas ventas en tu tienda',
    titleEn: 'More sales in your store',
    problemEs: 'Clientes que no pueden comprar online y ventas sin control.',
    problemEn: 'Customers cannot buy online and sales are hard to control.',
    solutionEs: 'POS integrado + Ecommerce abierto 24/7.',
    solutionEn: 'Integrated POS + Ecommerce open 24/7.',
    resultEs: 'Ventas extra incluso fuera de horario y control total de tu negocio.',
    resultEn: 'Extra sales beyond business hours and full control of your business.',
    testimonialEs: '"Con POS + tienda online empezamos a vender fuera del horario del local."',
    testimonialEn: '"With POS + ecommerce we started selling even after store hours."',
    icon: 'ri-shopping-cart-2-line',
    accent: 'blue',
  },
  {
    titleEs: 'Finanzas sin estres',
    titleEn: 'Stress-free financial management',
    problemEs: 'Horas perdidas revisando planillas y cuotas atrasadas.',
    problemEn: 'Hours wasted reviewing spreadsheets and overdue installments.',
    solutionEs: 'LMS automatizado + reportes claros de cartera.',
    solutionEn: 'Automated LMS + clear portfolio reports.',
    resultEs: 'Menos mora, menos retrabajo y visibilidad completa del riesgo.',
    resultEn: 'Lower arrears, less rework, and full risk visibility.',
    testimonialEs: '"Ahora vemos mora y cobranza en minutos, no en horas."',
    testimonialEn: '"Now we track arrears and collections in minutes, not hours."',
    icon: 'ri-line-chart-line',
    accent: 'teal',
  },
  {
    titleEs: 'Agenda medica ordenada',
    titleEn: 'Organized medical schedule',
    problemEs: 'Turnos desorganizados y pacientes que no se presentan.',
    problemEn: 'Disorganized appointments and patients who do not show up.',
    solutionEs: 'Sistema de citas online + recordatorios inteligentes.',
    solutionEn: 'Online appointment system + smart reminders.',
    resultEs: 'Pacientes puntuales, agenda estable y mejor experiencia de atencion.',
    resultEn: 'Punctual patients, stable schedule, and better care experience.',
    testimonialEs: '"Desde que usamos el sistema de citas, bajaron las ausencias un 40%."',
    testimonialEn: '"Since we implemented the appointment system, no-shows dropped by 40%."',
    icon: 'ri-calendar-check-line',
    accent: 'amber',
  },
  {
    titleEs: 'Confianza digital para tu Pyme',
    titleEn: 'Digital trust for your SMB',
    problemEs: 'Baja presencia online y fallas tecnicas que frenan tu operacion.',
    problemEn: 'Weak online presence and technical issues slowing your operation.',
    solutionEs: 'Web institucional moderna + soporte mensual garantizado.',
    solutionEn: 'Modern corporate website + guaranteed monthly support.',
    resultEs: 'Reputacion solida, continuidad operativa y mas confianza comercial.',
    resultEn: 'Solid reputation, operational continuity, and stronger commercial trust.',
    testimonialEs: '"Pasamos de apagar incendios a trabajar con estabilidad todo el mes."',
    testimonialEn: '"We went from firefighting to stable operations all month long."',
    icon: 'ri-settings-3-line',
    accent: 'slate',
  },
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

export default function ServiciosPage() {
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

          if (indicatorEl && trackEl && targetTab) {
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const previousIndex = prevPillarIndexRef.current

            const trackRect = trackEl.getBoundingClientRect()
            const targetRect = targetTab.getBoundingClientRect()
            const targetX = targetRect.left - trackRect.left
            const targetWidth = targetRect.width

            const currentX = Number(gsapLib.getProperty(indicatorEl, 'x')) || 0
            const distance = Math.abs(targetX - currentX)
            const stretch = Math.min(1.08, 1 + distance / 900)

            if (reducedMotion || previousIndex === null || previousIndex === activePillarIndex) {
              gsapLib.set(indicatorEl, { x: targetX, width: targetWidth, scaleX: 1 })
            } else {
              const direction = targetX > currentX ? 1 : -1
              gsapLib.killTweensOf(indicatorEl)

              gsapLib.timeline({ defaults: { overwrite: 'auto' } })
                .set(indicatorEl, {
                  transformOrigin: direction > 0 ? 'left center' : 'right center',
                  force3D: true,
                })
                .to(indicatorEl, { scaleX: stretch, duration: 0.14, ease: 'sine.out' }, 0)
                .to(indicatorEl, { x: targetX, width: targetWidth, duration: 0.5, ease: 'power2.inOut' }, 0)
                .to(indicatorEl, { scaleX: 1, duration: 0.22, ease: 'power1.out' }, 0.16)
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
            tl.fromTo(activePanel, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.05)
          }

          if (visibleCards.length > 0) {
            tl.fromTo(
              visibleCards,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, clearProps: 'opacity,visibility,transform' },
              0.1
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
              {t(
                'services_page_subtitle',
                'Elegi la solucion segun tu objetivo: captar mas clientes, ordenar procesos internos o mantener tu infraestructura estable.',
                'Choose the solution based on your goal: get more clients, improve internal processes, or keep your infrastructure stable.'
              )}
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
                alt={t(
                  'services_hero_image_alt',
                  'Equipo trabajando en planificacion y mejora de procesos',
                  'Team working on planning and process improvement'
                )}
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
          <Tab.Group
            selectedIndex={activePillarIndex}
            onChange={(index) => setActivePillar(PILLARS[index]?.id || PILLARS[0].id)}
          >
            <div className="mb-3 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/25 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
                <i className="ri-cursor-line"></i>
                {t('services_switch_hint', 'Selecciona una solución', 'Select a solution')}
              </span>
            </div>

            <Tab.List className="mb-8" ref={cardsRef}>
              <div className="max-w-3xl mx-auto rounded-full border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/80 p-1 shadow-sm">
                <div ref={switchTrackRef} className="relative grid grid-cols-3 gap-1">
                  <span
                    aria-hidden="true"
                    ref={switchIndicatorRef}
                    className="absolute top-0 bottom-0 left-0 rounded-full bg-blue-600 dark:bg-blue-500 shadow-lg shadow-blue-900/25"
                    style={{ width: `${100 / PILLARS.length}%` }}
                  />

                  {PILLARS.map((pillar, index) => (
                    <Tab
                      key={pillar.id}
                      data-pill-index={index}
                      className={({ selected }) =>
                        `relative z-10 flex items-center justify-center gap-2 rounded-full px-3 py-3 text-xs sm:text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${selected ? 'text-white' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`
                      }
                    >
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
          {activeSolutions.map((solution, index) => (
            <article
              key={solution.titleEs}
              data-solution-card
              className="snap-start min-w-[88%] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-7"
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {getText(solution, 'titleEs', 'titleEn')}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{getText(solution, 'timelineEs', 'timelineEn')}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 text-center">{getText(solution, 'descEs', 'descEn')}</p>

              <ul className="space-y-3 mb-6">
                {featureRows.map((feature) => {
                  const includes = cumulativeFeatureSets[index]?.has(feature)
                  return (
                    <li key={`${solution.titleEs}-${feature}`} className={`flex items-start gap-3 text-sm ${includes ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                      <i className={`${includes ? 'ri-check-line' : 'ri-close-line'} mt-0.5`}></i>
                      <span>{feature}</span>
                    </li>
                  )
                })}
              </ul>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 text-center">
                <span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}
              </p>
              <Button onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))} className="w-full rounded-full">
                {getText(solution, 'titleEs', 'titleEn')}
                {getText(solution, 'ctaEs', 'ctaEn')}
              </Button>
            </article>
          ))}
          </div>

          <div ref={desktopSolutionsRef} className="hidden md:flex md:flex-col lg:flex-row md:items-stretch md:justify-center gap-5 lg:gap-0 mb-12">
          {activeSolutions.map((solution, index) => (
            <article
              key={solution.titleEs}
              data-solution-card
              className={`w-full max-w-sm border-2 rounded-3xl p-8 flex flex-col bg-white dark:bg-slate-900 ${
                index === 1
                  ? 'border-dashed border-slate-300 dark:border-slate-700 lg:py-12 lg:z-10'
                  : 'border-slate-200 dark:border-slate-800'
              } ${index === 0 ? 'lg:-mr-4' : ''} ${index === 2 ? 'lg:-ml-4' : ''}`}
            >
              <div className="mb-8 text-center">
                {index === 1 ? (
                  <p className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500 mb-2">
                    {t('services_recommended', 'Recomendada', 'Recommended')}
                  </p>
                ) : null}
                <h3 className={`font-semibold mb-3 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-emerald-500' : 'text-blue-500'} text-2xl`}>
                  {getText(solution, 'titleEs', 'titleEn')}
                </h3>
                <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-none mb-3">
                  {index === 0 ? '01' : index === 1 ? '02' : '03'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{getText(solution, 'timelineEs', 'timelineEn')}</p>
              </div>

              <ul className="space-y-4 mb-8 min-h-[290px]">
                {featureRows.map((feature) => {
                  const includes = cumulativeFeatureSets[index]?.has(feature)
                  return (
                    <li key={`${solution.titleEs}-${feature}`} className={`flex items-start gap-3 text-base ${includes ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                      <i className={`${includes ? 'ri-check-line' : 'ri-close-line'} mt-0.5`}></i>
                      <span>{feature}</span>
                    </li>
                  )
                })}
              </ul>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 text-center">
                <span className="font-semibold">{t('services_outcome', 'Resultado', 'Outcome')}:</span> {getText(solution, 'outcomeEs', 'outcomeEn')}
              </p>

              <Button
                onClick={() => handleCardCta(getText(solution, 'titleEs', 'titleEn'))}
                className={`mt-auto rounded-full ${index === 1 ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white' : ''}`}
                variant={index === 1 ? 'default' : 'outline'}
              >
                {getText(solution, 'ctaEs', 'ctaEn')}
              </Button>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                {index === 1
                  ? t('services_plan_note_mid', 'Ideal para equipos que necesitan avanzar rapido.', 'Best for teams that need to move fast.')
                  : t('services_plan_note_side', 'Disenado para objetivos concretos y medibles.', 'Designed for concrete and measurable goals.')}
              </p>
            </article>
          ))}
          </div>
        </div>

        <div ref={useCasesRef} className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            {t('services_use_cases_title', 'Casos de uso por sector', 'Use Cases by Sector')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {USE_CASES.map((item) => (
              <article
                key={item.titleEs}
                data-use-case-card
                className={`border rounded-2xl p-6 shadow-sm ${USE_CASE_ACCENT[item.accent] || USE_CASE_ACCENT.slate}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl shrink-0 ${USE_CASE_ICON_ACCENT[item.accent] || USE_CASE_ICON_ACCENT.slate}`}>
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold leading-tight text-slate-900 dark:text-slate-100">{getText(item, 'titleEs', 'titleEn')}</h4>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  <span className="font-semibold">{t('services_case_problem', 'Problema', 'Problem')}:</span> {getText(item, 'problemEs', 'problemEn')}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  <span className="font-semibold">{t('services_case_solution', 'Solucion', 'Solution')}:</span> {getText(item, 'solutionEs', 'solutionEn')}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  <span className="font-semibold">{t('services_case_result', 'Resultado esperado', 'Expected result')}:</span> {getText(item, 'resultEs', 'resultEn')}
                </p>

                <p className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-slate-300 dark:border-slate-700 pl-3 mb-4">
                  {getText(item, 'testimonialEs', 'testimonialEn')}
                </p>

                <Button
                  size="sm"
                  onClick={() => handleUseCaseCta(getText(item, 'titleEs', 'titleEn'))}
                  className="rounded-full"
                >
                  {t('services_case_cta', 'Quiero esta solucion', 'I want this solution')}
                </Button>
              </article>
            ))}
          </div>
        </div>

        <div ref={finalCtaRef} className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
            {t('services_page_cta_title', 'No estas seguro de que solucion te conviene?', 'Not sure what solution fits best?')}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {t(
              'services_page_cta_desc',
              'Hacemos un diagnostico breve de tu situacion actual y te recomendamos el camino con mejor retorno.',
              'We run a short diagnostic and recommend the best path for your current stage.'
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleQuote} size="lg">
              {t('services_page_cta_btn', 'Solicitar diagnostico', 'Request diagnostic call')}
            </Button>
            <Button
              onClick={() => {
                const message = language === 'es'
                  ? 'Hola, quiero hablar por WhatsApp para definir que solucion me conviene.'
                  : 'Hi, I want to talk on WhatsApp to define what solution fits me best.'
                openWhatsApp(undefined, message)
              }}
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('services_page_cta_btn_secondary', 'Hablar por WhatsApp', 'Talk on WhatsApp')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
