'use client'

import { createContext, useContext } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const language = 'es'
  const toggleLanguage = () => {}
  const t = (key, textEs) => textEs || key
  const isInitialized = true

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      language: 'es',
      toggleLanguage: () => {},
      t: (key, textEs) => textEs || key,
      isInitialized: true,
    }
  }
  return context
}


