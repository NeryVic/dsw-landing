import { SITE_CONFIG, CONTACT_INFO } from './constants'

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_CONFIG.name,
  "alternateName": "DSW",
  "description": SITE_CONFIG.description,
  "url": SITE_CONFIG.url,
  "logo": `${SITE_CONFIG.url}/images/icons/logoo.png`,
  "image": `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
  "telephone": CONTACT_INFO.phone,
  "email": CONTACT_INFO.email,
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR",
    "addressLocality": "Formosa"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "contactType": "customer service",
      "areaServed": ["Formosa, AR", "Chaco, AR", "Argentina"],
      "availableLanguage": ["Spanish", "English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ],
  "sameAs": [
    SITE_CONFIG.links.instagram,
    SITE_CONFIG.links.linkedin1,
    SITE_CONFIG.links.whatsapp
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `Servicios de ${SITE_CONFIG.name}`,
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Software a Medida",
        "description": "Desarrollo de software a medida para resolver procesos manuales y cuellos de botella operativos",
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        },
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["AR", "US"],
        "serviceType": "Software Development"
      },
      {
        "@type": "Service",
        "name": "Landing Pages Profesionales",
        "description": "Páginas web optimizadas para conversión que atraen y convierten visitantes en clientes",
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        },
        "offers": {
          "@type": "Offer",
          "price": "299",
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["AR", "US"],
        "serviceType": "Web Development"
      },
      {
        "@type": "Service",
        "name": "Sistemas POS",
        "description": "Sistemas de punto de venta completos para gestionar tu negocio de manera eficiente",
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        },
        "offers": {
          "@type": "Offer",
          "price": "799",
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["AR", "US"],
        "serviceType": "Software Development"
      },
      {
        "@type": "Service",
        "name": "Desarrollo de Ecommerce",
        "description": "Tiendas online completas con pasarelas de pago y gestión de productos",
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        },
        "offers": {
          "@type": "Offer",
          "price": "999",
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["AR", "US"],
        "serviceType": "Ecommerce Development"
      },
      {
        "@type": "Service",
        "name": "Sistema de Reservas",
        "description": "Plataformas de reservas online para restaurantes, salones, consultorios y más",
        "provider": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        },
        "offers": {
          "@type": "Offer",
          "price": "599", 
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["AR", "US"],
        "serviceType": "Software Development"
      }
    ]
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_CONFIG.name,
  "url": SITE_CONFIG.url,
  "description": SITE_CONFIG.description,
  "inLanguage": ["es", "en"],
  "publisher": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.url}/images/icons/logoo.png`
    }
  }
}

export const supportLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ComputerRepair",
  "name": `${SITE_CONFIG.name} - Soporte Tecnico`,
  "description": "Soporte tecnico de PC para empresas y profesionales. Cobertura presencial en Formosa y Chaco, y soporte remoto para otras provincias.",
  "url": `${SITE_CONFIG.url}/soporte`,
  "telephone": CONTACT_INFO.phone,
  "email": CONTACT_INFO.email,
  "image": `${SITE_CONFIG.url}/images/soporte/soport.jpg`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Formosa",
    "addressRegion": "Formosa",
    "addressCountry": "AR"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Formosa" },
    { "@type": "AdministrativeArea", "name": "Chaco" }
  ],
  "serviceType": [
    "Soporte tecnico de PC",
    "Mantenimiento preventivo",
    "Soporte remoto y presencial"
  ],
  "availableLanguage": ["es", "en"],
  "sameAs": [
    SITE_CONFIG.links.whatsapp,
    SITE_CONFIG.links.instagram,
    SITE_CONFIG.links.linkedin1
  ]
}

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const testimonialsReviewSchema = (testimonials) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Software y Sistemas a Medida para PyMEs",
  "serviceType": "Desarrollo de software a medida",
  "provider": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Argentina"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": Number((testimonials.reduce((acc, item) => acc + (item.rating || 0), 0) / Math.max(testimonials.length, 1)).toFixed(1)),
    "reviewCount": testimonials.length,
    "bestRating": 5,
    "worstRating": 1
  },
  "review": testimonials.map((item) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": item.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": item.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": `${item.content} Resultado: ${item.quantifiedResult}`,
    "itemReviewed": {
      "@type": "Service",
      "name": "Implementacion de software a medida"
    }
  }))
})