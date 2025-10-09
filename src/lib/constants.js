export const SITE_CONFIG = {
  name: 'Digital Solutions Web',
  tagline: 'Convertimos ideas en soluciones digitales',
  description: 'Creamos landing pages, sistemas web (POS, Reservas) y ecommerce para impulsar tu negocio. Especialistas en soluciones digitales modernas y efectivas.',
  url: 'https://digitalsolutionsweb.com.ar',
  ogImage: '/images/og-digital-solutions.jpg',
  keywords: 'landing pages, sistemas web, POS, reservas, ecommerce, desarrollo web, soluciones digitales, páginas web',
  links: {
    whatsapp: 'https://wa.me/1234567890',
    instagram: 'https://instagram.com/digitalsolutionsweb',
    linkedin: 'https://linkedin.com/company/digital-solutions-web',
    email: 'digitalsolutionsweb3.0@gmail.com'
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '#hero', nameEn: 'Home' },
  { name: 'Servicios', href: '#services', nameEn: 'Services' },
  { name: '¿Por qué nosotros?', href: '#why-choose-us', nameEn: 'Why Choose Us' },
  { name: 'Testimonios', href: '#testimonials', nameEn: 'Testimonials' },
  //{ name: 'Contacto', href: '#contact', nameEn: 'Contact' }
]

export const CONTACT_INFO = {
  email: 'digitalsolutionsweb3.0@gmail.com',
  phone: '+1 (555) 123-4567',
  whatsapp: '+1 (555) 123-4567',
  address: 'Formosa, Argentina'
}

export const SOCIAL_LINKS = [
  { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: 'whatsapp' },
  { name: 'Instagram', url: 'https://www.instagram.com/dsw3.0', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/digital-solutions-web', icon: 'linkedin' }
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
    description: 'Plataformas de reservas online para restaurantes, salones, consultorios y más.',
    descriptionEn: 'Online booking platforms for restaurants, salons, clinics and more.',
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
    price: 'Desde $1199',
    priceEn: 'From $1199'
  },
 
]

export const steps = [
    {
      id: '1',
      message: '¡Hola! 👋 Soy el asistente virtual de DSW. ¿En qué puedo ayudarte?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'servicios', label: '🛠️ ¿Qué servicios ofrecen?', trigger: '3' },
        { value: 'contacto', label: '📞 ¿Cómo los contacto?', trigger: '4' },
        { value: 'ubicacion', label: '📍 ¿Dónde están ubicados?', trigger: '5' },
        { value: 'precios', label: '💰 ¿Cuánto cuestan sus servicios?', trigger: '6' },
        { value: 'otro', label: '❓ Otra pregunta', trigger: '7' },
      ],
    },
    {
      id: '3',
      message: 'Ofrecemos desarrollo web, diseño UI/UX, consultoría digital, y soluciones personalizadas para tu negocio. ¿Te gustaría saber más sobre algún servicio específico?',
      trigger: '8',
    },
    {
      id: '4',
      message: 'Puedes contactarnos a través del formulario en esta página, por WhatsApp haciendo clic en el botón flotante, o enviando un email a contacto@dsw.com',
      trigger: '8',
    },
    {
      id: '5',
      message: 'Estamos ubicados en Ciudad de Formosa, pero trabajamos de forma remota con clientes de toda Latinoamérica. 🌎',
      trigger: '8',
    },
    {
      id: '6',
      message: 'Nuestros precios varían según el proyecto. Te recomendamos contactarnos para obtener una cotización personalizada y sin compromiso.',
      trigger: '8',
    },
    {
      id: '7',
      user: true,
      trigger: '9',
    },
    {
      id: '9',
      message: 'Gracias por tu pregunta. Un miembro de nuestro equipo te contactará pronto para darte una respuesta personalizada. 😊',
      trigger: '8',
    },
    {
      id: '8',
      message: '¿Hay algo más en lo que pueda ayudarte?',
      trigger: '10',
    },
    {
      id: '10',
      options: [
        { value: 'si', label: 'Sí, tengo otra pregunta', trigger: '2' },
        { value: 'no', label: 'No, gracias', trigger: '11' },
      ],
    },
    {
      id: '11',
      message: '¡Perfecto! Estamos aquí cuando nos necesites. ¡Que tengas un excelente día! 🚀',
      end: true,
    },
  ]