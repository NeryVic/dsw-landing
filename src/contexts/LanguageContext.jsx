'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    // Cargar idioma guardado o detectar idioma del navegador
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en'
      setLanguage(browserLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key, textEs, textEn) => {
    return language === 'es' ? textEs : textEn
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}