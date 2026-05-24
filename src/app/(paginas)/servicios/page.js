import ServiciosPageClient from './ServiciosPageClient'

export const metadata = {
  title: 'Servicios de Desarrollo Web y Software a Medida en Argentina | Digital Solutions Web',
  description: 'Servicios de software a medida en Argentina para PyMEs: sistemas internos, automatizacion de procesos, ecommerce y soluciones web orientadas a resultados.',
  keywords: [
    'servicios de software a medida',
    'desarrollo web para empresas',
    'desarrollo de sistemas para pymes',
    'automatizacion de procesos argentina',
  ],
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: 'Servicios de Desarrollo Web y Software a Medida en Argentina | Digital Solutions Web',
    description: 'Servicios de software a medida en Argentina para PyMEs: sistemas internos, automatizacion de procesos, ecommerce y soluciones web orientadas a resultados.',
    url: 'https://digitalsolutionsweb.com.ar/servicios',
    type: 'website',
    images: [
      {
        url: 'https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp',
        width: 1200,
        height: 630,
        alt: 'Servicios de Desarrollo Web y Software a Medida en Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Desarrollo Web y Software a Medida en Argentina | Digital Solutions Web',
    description: 'Servicios de software a medida en Argentina para PyMEs: sistemas internos, automatizacion de procesos, ecommerce y soluciones web orientadas a resultados.',
    images: ['https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp'],
  },
}

export default function Page() {
  return <ServiciosPageClient />
}
