// CTA animation: entrada sutil y pulso discreto en el título
import { useEffect } from 'react'

export function useEfectoCTA(ctaRef, ctaTitleRef, ctaDescRef, ctaBtnRef, opts = {}) {
  useEffect(() => {
    let ctx = null
    let pulseTween = null

    // Respeta prefers-reduced-motion por defecto; permite override mediante opts.respectReducedMotion = false
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced && opts.respectReducedMotion !== false) {
      if (opts.debug) console.info('[useEfectoCTA] prefers-reduced-motion activo; respetando configuración y saltando animación')
      return
    }

    async function initCTA() {
      try {
        const mod = await import('gsap')
        const gsapLib = mod.default ?? mod

        // intentar importar ScrollTrigger por distintas rutas (compatibilidad de bundlers)
        let ScrollTrigger = null
        let pluginRegistered = false
        try {
          const stMod = await import('gsap/ScrollTrigger')
          ScrollTrigger = stMod?.default ?? stMod
        } catch (err1) {
          try {
            const stMod2 = await import('gsap/dist/ScrollTrigger')
            ScrollTrigger = stMod2?.default ?? stMod2
          } catch (err2) {
            ScrollTrigger = null
          }
        }

        try {
          if (ScrollTrigger && gsapLib.registerPlugin) {
            gsapLib.registerPlugin(ScrollTrigger)
            pluginRegistered = true
          }
        } catch (e) {
          pluginRegistered = false
        }

        if (opts.debug) console.info('[useEfectoCTA] initCTA, pluginRegistered=', pluginRegistered)

        if (!ctaRef?.current) {
          if (opts.debug) console.warn('[useEfectoCTA] ctaRef not mounted')
          return
        }

        const durationIn = opts.durationIn ?? 0.8

        if (gsapLib.context) {
          ctx = gsapLib.context(() => {
            const tlOpts = pluginRegistered ? { scrollTrigger: { trigger: ctaRef.current, start: opts.start ?? 'top 85%', toggleActions: opts.toggleActions ?? 'play none none reverse' } } : {}
            const tl = gsapLib.timeline(tlOpts)

            tl.from(ctaTitleRef.current, { opacity: 0, y: 18, duration: durationIn, ease: 'power2.out' })
            
            if (ctaDescRef?.current) {
              tl.from(ctaDescRef.current, { opacity: 0, y: 12, duration: durationIn, ease: 'power2.out' }, '-=0.5')
            }

            // pulso sutil en el título
            if (ctaTitleRef?.current) {
            pulseTween = gsapLib.to(ctaTitleRef.current, {
              scale: opts.pulseScale ?? 1.02,
              duration: opts.pulseDuration ?? 1.2,
              ease: opts.pulseEase ?? 'sine.inOut',
              repeat: opts.pulseRepeat ?? -1,
              yoyo: opts.pulseYoyo ?? true,
              transformOrigin: 'center center',
              delay: opts.pulseDelay ?? 0.3
            })
            }

            if (ctaBtnRef?.current) {
              tl.from(ctaBtnRef.current, { opacity: 0, scale: 0.9, duration: durationIn, ease: 'power2.out' }, '-=0.6')
            }

            // si el plugin no está disponible, reproducir inmediatamente la entrada
            if (!pluginRegistered && opts.debug) {
              if (opts.debug) console.info('[useEfectoCTA] ScrollTrigger no disponible — reproduciendo entrada inmediatamente')
              try { tl.play() } catch (e) {}
            }
          }, ctaRef.current)
        } else {
          // fallback: simple animación sin contexto
          if (opts.debug) console.info('[useEfectoCTA] usando fallback sin gsap.context')
          if (ctaTitleRef?.current) {
            gsapLib.from(ctaTitleRef.current, { opacity: 0, y: 18, duration: durationIn, ease: 'power2.out' })
            pulseTween = gsapLib.to(ctaTitleRef.current, { scale: opts.pulseScale ?? 1.02, duration: opts.pulseDuration ?? 1.2, ease: 'sine.inOut', repeat: opts.pulseRepeat ?? -1, yoyo: opts.pulseYoyo ?? true, transformOrigin: 'center center', delay: opts.pulseDelay ?? 0.6 })
          }
          if (ctaDescRef?.current) {
            gsapLib.from(ctaDescRef.current, { opacity: 0, y: 12, duration: durationIn, ease: 'power2.out', delay: 0.3 })
          }
          if (ctaBtnRef?.current) {
            gsapLib.from(ctaBtnRef.current, { opacity: 0, scale: 0.9, duration: durationIn, ease: 'power2.out', delay: 0.4 })
          }
        }
      } catch (e) {
        if (opts.debug) console.error('[useEfectoCTA] error inicializando gsap', e)
        // progressive enhancement: ignore errors silently in production
      }
    }

    initCTA()

    return () => {
      try { pulseTween && pulseTween.kill && pulseTween.kill() } catch (e) {}
      try { ctx && ctx.revert && ctx.revert() } catch (e) {}
    }
  }, [ctaRef, ctaTitleRef, ctaDescRef, ctaBtnRef, JSON.stringify(opts)])
}
