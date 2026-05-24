import SistemasPageClient from './SistemasPageClient'

export const metadata = {
  title: 'Software y Sistemas a Medida para PyMEs en Argentina | Digital Solutions Web',
  description: 'Desarrollo de sistemas a medida para PyMEs en Argentina. Eliminamos tareas manuales, errores operativos y falta de control con soluciones adaptadas a tu negocio.',
  keywords: [
    'software a medida argentina',
    'sistemas a medida para pymes',
    'desarrollo de software para empresas',
    'automatizacion operativa',
  ],
  alternates: {
    canonical: '/sistemas-a-medida',
  },
  openGraph: {
    title: 'Software y Sistemas a Medida para PyMEs en Argentina | Digital Solutions Web',
    description: 'Desarrollo de sistemas a medida para PyMEs en Argentina. Eliminamos tareas manuales, errores operativos y falta de control con soluciones adaptadas a tu negocio.',
    url: 'https://digitalsolutionsweb.com.ar/sistemas-a-medida',
    type: 'website',
    images: [
      {
        url: 'https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp',
        width: 1200,
        height: 630,
        alt: 'Software y Sistemas a Medida para PyMEs en Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software y Sistemas a Medida para PyMEs en Argentina | Digital Solutions Web',
    description: 'Desarrollo de sistemas a medida para PyMEs en Argentina. Eliminamos tareas manuales, errores operativos y falta de control con soluciones adaptadas a tu negocio.',
    images: ['https://digitalsolutionsweb.com.ar/images/og-digital-solutions.webp'],
  },
}

export default function Page() {
  return <SistemasPageClient />
}
