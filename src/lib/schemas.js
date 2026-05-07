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
      "areaServed": ["AR", "US"],
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