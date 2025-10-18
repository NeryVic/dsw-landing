import { useEffect, useRef } from 'react'

/**
 * Hook reutilizable para animaciones GSAP stagger en grids/listas.
 * @param {object} gridRef - ref del contenedor (useRef)
 * @param {string} itemSelector - selector CSS para los ítems (ej: '.feature-item')
 * @param {object} options - opciones GSAP (fromVars)
 */
export function useGsapStagger(gridRef, itemSelector, options = {}) {
  // Usar ref para evitar re-renders por cambios en options
  const optionsRef = useRef(options)
  
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    let ctx = null
    let ScrollTrigger = null
    
    async function animate() {
      try {
        // Import dinámico de GSAP
        const gsapModule = await import('gsap')
        const gsap = gsapModule.default || gsapModule
        
        // Import dinámico de ScrollTrigger
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule
        
        // Registrar plugin
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger)
        }

        // Validar que el ref existe
        if (!gridRef.current) return

        const items = Array.from(gridRef.current.querySelectorAll(itemSelector))
        if (items.length === 0) {
          console.warn(`useGsapStagger: No se encontraron elementos con selector "${itemSelector}"`)
          return
        }

        const currentOptions = optionsRef.current

        // Crear contexto GSAP (preferido en GSAP 3.11+)
        const animateItems = () => {
          gsap.from(items, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            ...currentOptions,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              ...currentOptions.scrollTrigger
            }
          })
        }

        if (gsap.context) {
          ctx = gsap.context(animateItems, gridRef.current)
        } else {
          animateItems()
        }
        
      } catch (error) {
        console.error('Error en useGsapStagger:', error)
      }
    }

    animate()

    // Cleanup
    return () => {
      if (ctx?.revert) {
        ctx.revert()
      }
      // Limpiar ScrollTriggers específicos si es necesario
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === gridRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [gridRef, itemSelector]) // Solo estas dependencias

  return null
}