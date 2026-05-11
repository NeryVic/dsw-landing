'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import Button from '@/components/ui/Button'
import { useWssp } from '@/hooks/wssp'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { openWhatsApp } = useWssp()
  const pathname = usePathname() || '/'
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar si el usuario hizo scroll para cambiar la transparencia del header
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleStartProject = () => {
    const message = language === 'es'
      ? '¡Hola! Quiero empezar mi proyecto con Digital Solutions Web. Me gustaría recibir más información sobre sus servicios.'
      : 'Hello! I want to start my project with Digital Solutions Web. I would like to receive more information about your services.'
    openWhatsApp(undefined, message)
  }

  // No renderizar hasta que esté montado en el cliente
  if (!t || typeof t !== 'function') {
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

  const isInternalPage = pathname !== '/'
  const hasSolidBg = isScrolled || isMobileMenuOpen || isInternalPage
  const headerBgClass = hasSolidBg
    ? 'bg-white/90 dark:bg-black/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm'
    : 'bg-transparent border-transparent'

  return (
  <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${headerBgClass} ${isMobileMenuOpen ? 'bg-white dark:bg-black bg-opacity-100' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className={`text-xl font-bold ${(isScrolled || isMobileMenuOpen) ? 'text-gray-900 dark:text-white' : 'text-white dark:text-white'}`}>
                Digital Solutions Web
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  suppressHydrationWarning
                  className={`group relative px-1 py-2 -my-2 inline-flex items-center transition-colors duration-200
                    ${isActive
                      ? (hasSolidBg
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-white font-semibold')
                      : (hasSolidBg
                        ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-white hover:text-blue-100')
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">
                    {language === 'es' ? item.name : item.nameEn}
                  </span>
                  <span className={`absolute left-0 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400 pointer-events-none transform origin-left transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-75 group-hover:opacity-100 group-hover:scale-x-100'}`} style={{width: '100%'}}>
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2 pr-4 md:pr-0">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 ${isMobileMenuOpen ? 'text-black dark:text-white' : (isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80')} transition-colors`}
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {language === 'es' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 ${isMobileMenuOpen ? 'text-black dark:text-white' : (isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80')} transition-colors`}
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
              className={`md:hidden p-2 mr-2 ${isMobileMenuOpen ? 'text-black dark:text-white' : (isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80')}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black bg-opacity-100">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    suppressHydrationWarning
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-gray-600 dark:text-gray-300 transition-colors duration-200 py-2 px-1 ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="block relative">
                      {language === 'es' ? item.name : item.nameEn}
                      <span className={`absolute left-0 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400 pointer-events-none transform origin-left transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-75 group-hover:opacity-100 group-hover:scale-x-100'}`} style={{width: '100%'}}>
                      </span>
                    </span>
                  </Link>
                )
              })}
              <div className="flex flex-col space-y-2 pt-4 px-4">
                <Button size="sm" onClick={handleStartProject} className="w-full max-w-xs mx-auto">
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