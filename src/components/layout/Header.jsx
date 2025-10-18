'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
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
  const [activeId, setActiveId] = useState('#hero')
  const observerRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Detectar si el usuario hizo scroll para cambiar la transparencia del header
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Observador para actualizar el item activo según la sección visible
  useEffect(() => {
    // limpiar observador previo
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const sectionIds = NAVIGATION_ITEMS.map((it) => it.href).filter(Boolean).map(h => h.replace('#', ''))
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px', // marcar cuando la sección se acerca al centro-superior del viewport
        threshold: 0.5,
      }
    )

    sections.forEach((el) => observer.observe(el))
    observerRef.current = observer

    // también actualizar activeId si hay hash en la URL al cargar
    const hash = window.location.hash
    if (hash) setActiveId(hash)

    return () => observer.disconnect()
  }, [isMounted])

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

  const headerBgClass = isScrolled
    ? 'bg-white/90 dark:bg-black/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm'
    : 'bg-transparent border-transparent'

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${headerBgClass}`}>
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
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white dark:text-white'}`}>
                Digital Solutions Web
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = activeId === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveId(item.href)}
                  className={`group relative px-1 py-2 -my-2 inline-flex items-center transition-colors duration-200
                    ${isActive
                      ? (isScrolled
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-white font-semibold')
                      : (isScrolled
                        ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-white hover:text-blue-100')
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">
                    {language === 'es' ? item.name : item.nameEn}
                  </span>
                  {/* animated underline: blurred glow + crisp line */}
                  <span className={`absolute left-0 bottom-0 h-1 rounded-full pointer-events-none transform origin-left transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 scale-x-100' : 'opacity-0 -translate-x-2 scale-x-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-x-100'}`} style={{width: '100%'}}>
          {/* blurred glow */}
          <span className="block w-full h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-white/50 opacity-80 filter blur-md bg-clip-padding" />
          {/* crisp line */}
          <span className="block w-full h-0.5 rounded-full mt-[-0.35rem] bg-gradient-to-r from-blue-700 via-blue-500 to-white/90 dark:from-white/90 dark:via-white/40 dark:to-transparent opacity-100 mix-blend-screen" />
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 ${isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80'} transition-colors`}
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {language === 'es' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 ${isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80'} transition-colors`}
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
              className={`md:hidden p-2 ${isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-white/80'}`}
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
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeId === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setActiveId(item.href)
                    }}
                    className={`text-gray-600 dark:text-gray-300 transition-colors duration-200 py-2 px-1 ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="block relative">
                      {language === 'es' ? item.name : item.nameEn}
                      <span className={`absolute left-0 bottom-0 h-1 rounded-full pointer-events-none transform origin-left transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 scale-x-100' : 'opacity-0 -translate-x-2 scale-x-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-x-100'}`} style={{width: '100%'}}>
                        <span className="block w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-60 filter blur-sm" />
                        <span className="block w-full h-0.5 rounded-full mt-[-0.35rem] bg-gradient-to-r from-white/90 via-white/40 to-transparent opacity-90 mix-blend-screen" />
                      </span>
                    </span>
                  </Link>
                )
              })}
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