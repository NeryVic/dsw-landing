import Link from 'next/link'
import { SOCIAL_LINKS, NAVIGATION_ITEMS, CONTACT_INFO } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              DSW Landing
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Transformamos ideas en soluciones digitales innovadoras. 
              Construyendo el futuro, una línea de código a la vez.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {/* Aquí irían los iconos SVG */}
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{CONTACT_INFO.email}</li>
              <li>{CONTACT_INFO.phone}</li>
              <li>{CONTACT_INFO.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DSW Landing. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}