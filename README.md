# DSW Landing Page

Una landing page moderna y escalable construida con Next.js 15, React 19 y Tailwind CSS.

## 🚀 Características

- ⚡ **Next.js 15** - El framework React más moderno
- 🎨 **Tailwind CSS** - Diseño moderno y responsive
- 🧩 **Componentes modulares** - Fácil mantenimiento y reutilización
- 📱 **Responsive** - Optimizado para todos los dispositivos
- 🎯 **SEO optimizado** - Meta tags y Open Graph configurados
- 🔧 **TypeScript ready** - Preparado para migrar a TypeScript
- 📊 **Performance** - Optimizado para velocidad y Core Web Vitals

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.js          # Layout principal con Header/Footer
│   ├── page.js            # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI básicos
│   │   ├── Button.jsx    # Botón reutilizable
│   │   ├── Card.jsx      # Tarjetas
│   │   └── Input.jsx     # Inputs para formularios
│   ├── layout/           # Componentes de layout
│   │   ├── Header.jsx    # Navegación principal
│   │   └── Footer.jsx    # Pie de página
│   └── sections/         # Secciones de la landing
│       ├── HeroSection.jsx      # Sección principal
│       └── FeaturesSection.jsx  # Sección de características
├── lib/                  # Utilidades y configuraciones
│   ├── utils.js         # Funciones utilitarias
│   ├── constants.js     # Constantes de la aplicación
│   └── validations.js   # Esquemas de validación
├── hooks/               # Custom hooks
│   ├── useForm.js       # Hook para formularios
│   ├── useScroll.js     # Hook para scroll tracking
│   └── useIntersectionObserver.js  # Hook para animations
└── data/               # Datos estáticos
    ├── features.js     # Datos de características
    ├── testimonials.js # Testimonios
    └── pricing.js      # Planes de precios
```

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd dsw-landing
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   pnpm dev
   ```

4. **Construir para producción**
   ```bash
   pnpm build
   pnpm start
   ```

## 🎨 Personalización

### Colores y Branding
- Edita `src/lib/constants.js` para cambiar información de la empresa
- Modifica los colores en `tailwind.config.js`
- Actualiza el logo en el componente `Header.jsx`

### Contenido
- **Hero Section**: Edita `src/components/sections/HeroSection.jsx`
- **Features**: Modifica `src/data/features.js`
- **Testimonials**: Actualiza `src/data/testimonials.js`
- **Pricing**: Cambia `src/data/pricing.js`

### Agregar Nuevas Secciones
1. Crea un nuevo componente en `src/components/sections/`
2. Agrega los datos en `src/data/` si es necesario
3. Importa y usa en `src/app/page.js`

## 📱 Componentes Disponibles

### UI Components
- `Button` - Botón con variantes (primary, secondary, outline, ghost)
- `Card` - Tarjetas con header, content y footer
- `Input` - Input con validación y estilos
- `Textarea` - Textarea para formularios

### Layout Components
- `Header` - Navegación fija con logo y menú
- `Footer` - Pie de página con links y redes sociales

### Section Components
- `HeroSection` - Sección principal con CTA
- `FeaturesSection` - Características del producto/servicio

## 🔧 Hooks Disponibles

- `useForm` - Manejo de formularios con validación
- `useScroll` - Tracking de scroll y dirección
- `useIntersectionObserver` - Animaciones en scroll

## 🚀 Próximos Pasos

Para hacer tu landing page aún mejor, considera agregar:

1. **Más Secciones**:
   - Testimonios
   - Pricing
   - FAQ
   - Contact Form
   - Blog/News

2. **Funcionalidades**:
   - Animaciones (Framer Motion)
   - Analytics (Google Analytics, Vercel Analytics)
   - SEO avanzado (next-seo)
   - Formularios (React Hook Form + API routes)

3. **Optimizaciones**:
   - Imágenes optimizadas (next/image)
   - Lazy loading
   - Code splitting
   - PWA support

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
