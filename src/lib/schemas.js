export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Solutions Web",
  "alternateName": "DSW",
  "description": "Empresa especializada en desarrollo de landing pages, sistemas POS, ecommerce y sistemas de reservas para empresas y emprendedores",
  "url": "https://digitalsolutionsweb.com",
  "logo": "https://digitalsolutionsweb.com/images/logo.png",
  "image": "https://digitalsolutionsweb.com/images/og-digital-solutions.jpg",
  "telephone": "+1-555-123-4567",
  "email": "contacto@digitalsolutionsweb.com",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MX",
    "addressLocality": "Tu Ciudad"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "areaServed": ["MX", "US"],
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
    "https://instagram.com/digitalsolutionsweb",
    "https://linkedin.com/company/digital-solutions-web",
    "https://wa.me/1234567890"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Digital Solutions Web",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Landing Pages Profesionales",
        "description": "Páginas web optimizadas para conversión que atraen y convierten visitantes en clientes",
        "provider": {
          "@type": "Organization",
          "name": "Digital Solutions Web"
        },
        "offers": {
          "@type": "Offer",
          "price": "299",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["MX", "US"],
        "serviceType": "Web Development"
      },
      {
        "@type": "Service", 
        "name": "Sistemas POS",
        "description": "Sistemas de punto de venta completos para gestionar tu negocio de manera eficiente",
        "provider": {
          "@type": "Organization",
          "name": "Digital Solutions Web"
        },
        "offers": {
          "@type": "Offer",
          "price": "799",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["MX", "US"],
        "serviceType": "Software Development"
      },
      {
        "@type": "Service",
        "name": "Desarrollo de Ecommerce", 
        "description": "Tiendas online completas con pasarelas de pago y gestión de productos",
        "provider": {
          "@type": "Organization",
          "name": "Digital Solutions Web"
        },
        "offers": {
          "@type": "Offer",
          "price": "999",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["MX", "US"],
        "serviceType": "Ecommerce Development"
      },
      {
        "@type": "Service",
        "name": "Sistema de Reservas",
        "description": "Plataformas de reservas online para restaurantes, salones, consultorios y más",
        "provider": {
          "@type": "Organization",
          "name": "Digital Solutions Web"
        },
        "offers": {
          "@type": "Offer",
          "price": "599", 
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": ["MX", "US"],
        "serviceType": "Software Development"
      }
    ]
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Digital Solutions Web",
  "url": "https://digitalsolutionsweb.com",
  "description": "Soluciones digitales profesionales: landing pages, sistemas POS, ecommerce y reservas",
  "inLanguage": ["es", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://digitalsolutionsweb.com/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digital Solutions Web",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digitalsolutionsweb.com/images/logo.png"
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