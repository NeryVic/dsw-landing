'use client'

import { useState, useEffect, useRef } from 'react'

export default function LazySection({ 
  children, 
  fallback = null,
  threshold = 0.1,
  rootMargin = '50px',
  className = '' 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, hasLoaded])

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? (
        <div className="fade-in">
          {children}
        </div>
      ) : (
        fallback || (
          <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-gray-400 dark:text-gray-600">
              <i className="ri-loader-4-line text-2xl animate-spin"></i>
            </div>
          </div>
        )
      )}
    </div>
  )
}