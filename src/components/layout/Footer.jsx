import Link from 'next/link'
import { SOCIAL_LINKS, NAVIGATION_ITEMS, CONTACT_INFO } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              DSW
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Transformamos ideas en soluciones digitales innovadoras. 
              Construyendo el futuro, una línea de código a la vez.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon === 'whatsapp' && <i className="ri-whatsapp-line text-xl"></i>}
                  {social.icon === 'instagram' && <i className="ri-instagram-line text-xl"></i>}
                  {social.icon === 'linkedin' && <i className="ri-linkedin-line text-xl"></i>}
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
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
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
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <i className="ri-mail-line text-lg mr-3"></i>
                {CONTACT_INFO.email}
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line text-lg mr-3"></i>
                {CONTACT_INFO.phone}
              </li>
              <li className="flex items-center">
                <i className="ri-map-pin-line text-lg mr-3"></i>
                {CONTACT_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Digital Solutions Web Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}