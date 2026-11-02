# DSW Landing — Sitio corporativo multi-página con chatbot IA

Landing corporativa desarrollada para **Digital Solutions Web**, empresa de desarrollo de software y sistemas a medida. Seis páginas orientadas a conversión, un chatbot con IA que responde sobre servicios y precios, y captación de leads por email.

> **Estado del proyecto: finalizado.** Digital Solutions Web se disolvió y el sitio ya no está online. Este repositorio conserva el código como muestra técnica del trabajo realizado.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Lenguaje | JavaScript / JSX |
| Estilos | Tailwind CSS 4 |
| Animaciones | GSAP 3 + ScrollTrigger |
| Componentes | Headless UI 2, Remixicon |
| Fuentes | next/font (Geist) |
| API serverless | Route Handlers de Next.js |
| IA | API de OpenAI (gpt-4o-mini) |
| Email | Nodemailer + Gmail SMTP |
| Package manager | pnpm |

---

## Qué incluye

### Sitio (seis páginas)
- **Inicio**, **Servicios**, **Sistemas a medida**, **Soporte**, **FAQs** y **Contacto**
- Diseño responsive con Tailwind CSS 4
- Modo oscuro con `ThemeContext`
- Header fijo, footer, botón flotante de WhatsApp y chatbot global
- Componentes reutilizables de UI (Button, Card, Input)
- Animaciones de entrada y scroll con GSAP y ScrollTrigger
- Contenido orientado a conversión: servicios, precios, testimonios, planes de soporte y FAQs

### Chatbot con IA
- Flujo guiado de respuestas rápidas y modo de preguntas libres
- Base de conocimiento construida desde servicios, casos de uso, precios, planes y testimonios
- Historial de conversación manejado del lado del servidor (evita inyección de historial desde el cliente)
- Límites: 700 caracteres por mensaje, 8 turnos de historial, 150 tokens de salida
- Rate limiting por IP y por sesión con cooldown entre mensajes
- Límite de tamaño del body y verificación opcional de origen
- Post-procesamiento para evitar que el modelo invente precios sin datos oficiales
- La API key de OpenAI vive solo en el servidor

### Captación de leads
- Formulario con validación de nombre, email, empresa, tipo de contacto y mensaje
- Sanitización y escape de HTML antes del envío
- Honeypot y tiempo mínimo de completado para bloquear bots
- Límites por IP y por email, cooldown entre envíos y tope de tamaño del body
- Envío transaccional con Nodemailer y Gmail SMTP

### SEO técnico y performance
- Metadata API por página: título, descripción, keywords, canonical, Open Graph y Twitter Cards
- Datos estructurados JSON-LD: Organization, WebSite, OfferCatalog, FAQPage, LocalBusiness, Review y BreadcrumbList
- `sitemap.xml`, `robots.txt` y verificación de Google
- Imágenes en AVIF/WebP con tamaños configurados y caché de un año
- `next/font` con `display: swap` y preload selectivo
- Lazy rendering con IntersectionObserver y carga dinámica de GSAP
- Optimización de CSS, compresión y `removeConsole` en producción
- Headers de seguridad: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy y Permissions-Policy

---

## Estructura

```
src/
├── app/
│   ├── layout.js              # Layout principal
│   ├── page.js                # Página de inicio
│   ├── (paginas)/             # Servicios, sistemas, soporte, FAQs, contacto
│   └── api/
│       ├── chat/route.js      # Route Handler del chatbot (OpenAI)
│       └── leads/route.js     # Route Handler de captación de leads
├── components/
│   ├── ui/                    # Button, Card, Input
│   ├── layout/                # Header, Footer
│   ├── sections/              # Secciones de página
│   └── ChatBot.jsx
├── lib/
│   ├── constants.js           # Configuración del sitio
│   └── schemas.js             # Generadores de JSON-LD
├── hooks/                     # Custom hooks
└── data/                      # Contenido estático
```

---

## Cómo ejecutarlo localmente

```bash
git clone https://github.com/NeryVic/dsw-landing.git
cd dsw-landing
pnpm install
```

Copia `.env.example` a `.env.local` y completa:

```env
GMAIL_USER=
GMAIL_APP_PASSWORD=
LEADS_TO_EMAIL=
LEADS_FROM_EMAIL=
OPENAI_API_KEY=
```

```bash
pnpm dev      # desarrollo
pnpm build    # build de producción
pnpm start    # servidor de producción
```

Sin las variables configuradas el sitio navega normalmente, pero el chatbot y el formulario de contacto no responden.

---

## Notas

- El almacenamiento de leads en memoria (últimos 500) no es persistente: es una salvaguarda, no una base de datos.
- Las credenciales nunca se commitean; viven en variables de entorno.

---

## Autor

**Victor Neri Duré** — Desarrollador Front End / Full Stack
[LinkedIn](https://linkedin.com/in/nerydev-it) · [GitHub](https://github.com/NeryVic)
