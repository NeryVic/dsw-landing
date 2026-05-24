export const SITE_CONFIG = {
  name: 'Digital Solutions Web',
  tagline: 'Desarrollo de software y sistemas a medida para empresas',
  description: 'Software a medida en Argentina para PyMEs que necesitan automatizar procesos, eliminar errores operativos y recuperar control real de su operacion.',
  url: 'https://digitalsolutionsweb.com.ar',
  ogImage: '/images/og-digital-solutions.webp',
  keywords: 'software a medida argentina, sistemas a medida para pymes, desarrollo de software para empresas, sistema pos para ferreteria, desarrollo de sistemas para pymes, automatizacion de procesos empresariales, digital solutions web',
  links: {
    whatsapp: 'https://wa.me/+5493704360388',
    instagram: 'https://instagram.com/dsw3.0',
    linkedin1: 'https://www.linkedin.com/in/nerydev-2206-it/',
    linkedin2: 'https://www.linkedin.com/in/alejandro-pintos-44b0a62a6/',
    email: 'digitalsolutionsweb3.0@gmail.com'
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '/', nameEn: 'Home' },
  { name: 'Servicios', href: '/servicios', nameEn: 'Services' },
  { name: 'Sistemas a Medida', href: '/sistemas-a-medida', nameEn: 'Custom Systems' },
  { name: 'Soporte Técnico', href: '/soporte', nameEn: 'Technical Support' },
  { name: 'FAQs', href: '/faqs', nameEn: 'FAQs' },
  { name: 'Contacto', href: '/contacto', nameEn: 'Contact' }
]

export const CONTACT_INFO = {
  email: SITE_CONFIG.links.email,
  phone: '+54 9 3704 360388',
  whatsapp: SITE_CONFIG.links.whatsapp,
  address: 'Formosa, Argentina'
}

export const SOCIAL_LINKS = [
  { name: 'WhatsApp', url: SITE_CONFIG.links.whatsapp, icon: 'whatsapp' },
  { name: 'Instagram', url: SITE_CONFIG.links.instagram, icon: 'instagram' },
  { name: 'LinkedIn', url: SITE_CONFIG.links.linkedin1, icon: 'linkedin' },
  { name: 'LinkedIn2', url: SITE_CONFIG.links.linkedin2, icon: 'linkedin' },
]

export const SERVICES = [
  {
    id: 1,
    title: 'Landing Pages',
    titleEn: 'Landing Pages',
    description: 'Páginas web optimizadas para conversión que atraen y convierten visitantes en clientes.',
    descriptionEn: 'Conversion-optimized web pages that attract and convert visitors into customers.',
    icon: 'landing',
    features: ['Diseño responsive', 'SEO optimizado', 'Alta conversión', 'Carga rápida'],
    featuresEn: ['Responsive design', 'SEO optimized', 'High conversion', 'Fast loading'],
    price: 'Desde $299',
    priceEn: 'From $299'
  }, {
    id: 3,
    title: 'Sistema de Reservas',
    titleEn: 'Booking Systems',
    description: 'Plataformas de reservas online para veterinarias, salones, consultorios y más.',
    descriptionEn: 'Online booking platforms for veterinary services, salons, clinics and more.',
    icon: 'booking',
    features: ['Calendario integrado', 'Notificaciones', 'Pagos online', 'Gestión de clientes'],
    featuresEn: ['Integrated calendar', 'Notifications', 'Online payments', 'Customer management'],
    price: 'Desde $599',
    priceEn: 'From $599'
  },
  
  {
    id: 4,
    title: 'Ecommerce',
    titleEn: 'Ecommerce',
    description: 'Tiendas online completas con pasarelas de pago y gestión de productos.',
    descriptionEn: 'Complete online stores with payment gateways and product management.',
    icon: 'ecommerce',
    features: ['Carrito de compras', 'Pasarelas de pago', 'Gestión de productos', 'Panel admin'],
    featuresEn: ['Shopping cart', 'Payment gateways', 'Product management', 'Admin panel'],
    price: 'Desde $999',
    priceEn: 'From $999'
  },
  {
    id: 2,
    title: 'Sistemas POS',
    titleEn: 'POS Systems',
    description: 'Sistemas de punto de venta completos para gestionar tu negocio de manera eficiente.',
    descriptionEn: 'Complete point of sale systems to manage your business efficiently.',
    icon: 'pos',
    features: ['Gestión de inventario', 'Reportes en tiempo real', 'Multi-usuario', 'Facturación'],
    featuresEn: ['Inventory management', 'Real-time reports', 'Multi-user', 'Billing'],
    price: 'Desde $15/mes',
    priceEn: 'From $15/month'
  },
 
]
