'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ChatBot from '@/components/ChatBot'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function ClientWrapper({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <ChatBot />
        <FloatingWhatsApp />
      </LanguageProvider>
    </ThemeProvider>
  )
}
