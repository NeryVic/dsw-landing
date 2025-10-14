'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { language, toggleLanguage, t, isInitialized } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { openWhatsApp } = useWssp()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleStartProject = () => {
    const message = language === 'es'
      ? '¡Hola! Quiero empezar mi proyecto con Digital Solutions Web. Me gustaría recibir más información sobre sus servicios.'
      : 'Hello! I want to start my project with Digital Solutions Web. I would like to receive more information about your services.'
    openWhatsApp(undefined, message)
  }

  // No renderizar hasta que esté montado en el cliente
  if (!isMounted || !t || typeof t !== 'function') {
    return (
      <header className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Digital Solutions Web
              </span>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center relative dark:bg-gradient-to-br dark:from-blue-400 dark:to-purple-800">
                <Image 
                  src="/images/icons/logoo.png" 
                  alt="Logo Digital Solutions Web" 
                  width={28}
                  height={28}
                  className="object-contain"
                  priority={true}
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Digital Solutions Web
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {language === 'es' ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {language === 'es' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <i className="ri-moon-line text-lg"></i>
              ) : (
                <i className="ri-sun-line text-lg"></i>
              )}
            </button>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button size="sm" onClick={handleStartProject}>
                {t('cta', 'Empezar Proyecto', 'Start Project')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === 'es' ? item.name : item.nameEn}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button size="sm" onClick={handleStartProject}>
                  {t('cta', 'Empezar Proyecto', 'Start Project')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}