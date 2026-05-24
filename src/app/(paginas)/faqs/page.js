import FaqsPageClient from './FaqsPageClient'

export const metadata = {
  title: 'Preguntas Frecuentes | Digital Solutions Web',
  description: 'Respuestas claras sobre tiempos, costos, alcance y soporte para que puedas decidir con informacion real.',
  keywords: [
    'preguntas frecuentes software a medida',
    'faq desarrollo de software',
    'costos sistema a medida',
    'soporte post implementacion',
  ],
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'Preguntas Frecuentes | Digital Solutions Web',
    description: 'Respuestas claras sobre tiempos, costos, alcance y soporte para que puedas decidir con informacion real.',
    url: 'https://digitalsolutionsweb.com.ar/faqs',
    type: 'website',
    images: [
      {
        url: 'https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp',
        width: 1200,
        height: 630,
        alt: 'Preguntas Frecuentes | Digital Solutions Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes | Digital Solutions Web',
    description: 'Respuestas claras sobre tiempos, costos, alcance y soporte para que puedas decidir con informacion real.',
    images: ['https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp'],
  },
}

export default function Page() {
  return <FaqsPageClient />
}
