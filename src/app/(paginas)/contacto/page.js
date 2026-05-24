import ContactoPageClient from './ContactoPageClient'

export const metadata = {
  title: 'Contacto | Diagnostico Inicial de Software a Medida en 24h',
  description: 'Contanos tu caso y recibi un diagnostico inicial en 24 horas. Sin compromiso y sin presion. Ideal para empresas que necesitan automatizar procesos.',
  keywords: [
    'contacto software a medida',
    'diagnostico de procesos pymes',
    'desarrollo de sistemas argentina',
    'asesoramiento software empresarial',
  ],
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto | Diagnostico Inicial de Software a Medida en 24h',
    description: 'Contanos tu caso y recibi un diagnostico inicial en 24 horas. Sin compromiso y sin presion. Ideal para empresas que necesitan automatizar procesos.',
    url: 'https://digitalsolutionsweb.com.ar/contacto',
    type: 'website',
    images: [
      {
        url: 'https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp',
        width: 1200,
        height: 630,
        alt: 'Contacto | Diagnostico Inicial de Software a Medida en 24h',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Diagnostico Inicial de Software a Medida en 24h',
    description: 'Contanos tu caso y recibi un diagnostico inicial en 24 horas. Sin compromiso y sin presion. Ideal para empresas que necesitan automatizar procesos.',
    images: ['https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp'],
  },
}

export default function Page() {
  return <ContactoPageClient />
}
