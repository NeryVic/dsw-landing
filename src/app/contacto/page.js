'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants'
import { useWssp } from '@/hooks/wssp'

export default function ContactoPage() {
  const { language, t } = useLanguage()
  const { openWhatsApp } = useWssp()

  const handleContact = () => {
    const message = language === 'es'
      ? 'Hola, quiero conversar sobre un proyecto. ¿Podemos coordinar una reunión inicial?'
      : 'Hi, I want to discuss a project. Can we schedule an initial meeting?'
    openWhatsApp(undefined, message)
  }

  return (
    <section className="min-h-screen pt-28 pb-16 bg-slate-100 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            {t('contact_page_title', 'Contacto', 'Contact')}
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            {t(
              'contact_page_intro',
              'Contanos tu situación actual y te proponemos una solución concreta según tus objetivos y presupuesto.',
              'Tell us your current situation and we will propose a concrete solution according to your goals and budget.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              {t('contact_page_data_title', 'Canales directos', 'Direct channels')}
            </h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li><strong>Email:</strong> {CONTACT_INFO.email}</li>
              <li><strong>Teléfono:</strong> {CONTACT_INFO.phone}</li>
              <li><strong>Ubicación:</strong> {CONTACT_INFO.address}</li>
            </ul>
          </article>

          <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              {t('contact_page_cta_title', 'Agendemos una charla breve', 'Let us schedule a short call')}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {t(
                'contact_page_cta_desc',
                'En una primera conversación podemos definir prioridades, alcance inicial y próximos pasos.',
                'In a first conversation we can define priorities, initial scope, and next steps.'
              )}
            </p>
            <Button onClick={handleContact} size="lg">
              {t('contact_page_cta_btn', 'Escribir por WhatsApp', 'Message on WhatsApp')}
            </Button>
          </article>
        </div>
      </div>
    </section>
  )
}
