'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      // Cargar idioma guardado o detectar idioma del navegador
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage) {
        setLanguage(savedLanguage)
      } else {
        const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en'
        setLanguage(browserLanguage)
      }
      setIsInitialized(true)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
    // Solo guardar en localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage)
    }
  }

  const t = (key, textEs, textEn) => {
    if (typeof textEs !== 'string' || typeof textEn !== 'string') {
      console.warn('t() called with invalid parameters:', { key, textEs, textEn })
      return textEs || textEn || key
    }
    return language === 'es' ? textEs : textEn
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Fallback en caso de error de contexto
    console.error('useLanguage must be used within a LanguageProvider')
    return {
      language: 'es',
      toggleLanguage: () => {},
      t: (key, textEs, textEn) => textEs || textEn || key
    }
  }
  return context
}