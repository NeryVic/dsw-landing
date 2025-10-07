import { SITE_CONFIG } from '@/lib/constants'

export default function CriticalResourceHints() {
  return (
    <>
      {/* DNS prefetch para dominios externos */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      
      {/* Preconnect para recursos críticos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Resource hints para redes sociales */}
      <link rel="dns-prefetch" href="//instagram.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      
      {/* Viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Theme color para PWA */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </>
  )
}