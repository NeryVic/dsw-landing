'use client'

import { useEffect } from 'react'

const PC_BUILDS = [
  {
    id: 'oficina',
    name: 'Oficina',
    tag: 'Gestión y trabajo diario',
    price: 'USD 470',
    priceNote: 'Pagás en pesos al cambio del día',
    neon: 'cyan',
    components: [
      { icon: 'ri-cpu-line', label: 'CPU: Ryzen 3 4100 + Disipador' },
      { icon: 'ri-database-2-line', label: 'RAM: 8 GB DDR4' },
      { icon: 'ri-hard-drive-2-line', label: 'SSD: 512 GB' },
      { icon: 'ri-circuit-board-line', label: 'MOBO: A520M' },
      { icon: 'ri-plug-line', label: 'Fuente: 500W' },
      { icon: 'ri-server-line', label: 'Gabinete básico' },
    ],
    cta: 'Consultar disponibilidad',
    msg: 'Hola, me interesa la PC Oficina (USD 470). ¿Podemos coordinar?',
  },
  {
    id: 'profesional',
    name: 'Profesional',
    tag: 'Multitarea y sistemas',
    price: 'USD 680',
    priceNote: 'Pagás en pesos al cambio del día',
    popular: true,
    neon: 'purple',
    components: [
      { icon: 'ri-cpu-line', label: 'CPU: Ryzen 5 8600G + Disipador' },
      { icon: 'ri-database-2-line', label: 'RAM: 16 GB DDR5' },
      { icon: 'ri-hard-drive-2-line', label: 'SSD: 1 TB' },
      { icon: 'ri-circuit-board-line', label: 'MOBO: B840' },
      { icon: 'ri-tv-2-line', label: 'GPU: Radeon 760M (iGPU)' },
      { icon: 'ri-plug-line', label: 'Fuente: 650W' },
      { icon: 'ri-server-line', label: 'Gabinete con ventilación' },
    ],
    cta: 'La quiero - coordinar compra',
    msg: 'Hola, me interesa la PC Profesional (USD 680, Ryzen 5 8600G). ¿Podemos coordinar la compra?',
  },
  {
    id: 'alto-rendimiento',
    name: 'Gamer',
    tag: 'Gaming, diseño y trabajo pesado',
    price: 'USD 1.050',
    priceNote: 'Pagás en pesos al cambio del día',
    neon: 'green',
    components: [
      { icon: 'ri-cpu-line', label: 'CPU: Ryzen 7 8700G + Disipador' },
      { icon: 'ri-database-2-line', label: 'RAM: 32 GB DDR5' },
      { icon: 'ri-hard-drive-2-line', label: 'SSD: 2 TB' },
      { icon: 'ri-circuit-board-line', label: 'MOBO: B840 / X670' },
      { icon: 'ri-tv-2-line', label: 'GPU: RX 7600 8GB (dedicada)' },
      { icon: 'ri-plug-line', label: 'Fuente: 750W' },
      { icon: 'ri-server-line', label: 'Gabinete c/ ventilación premium' },
    ],
    cta: 'Necesito asesoramiento',
    msg: 'Hola, me interesa la PC Gamer (USD 1.050, Ryzen 7 + RX 7600). ¿Podemos coordinar?',
  },
]

const neonStyles = {
  cyan: {
    border: 'border-cyan-400',
    glow: { boxShadow: '0 0 22px rgba(34,211,238,0.45), inset 0 0 22px rgba(34,211,238,0.04)' },
    badge: 'text-cyan-400',
    price: 'text-cyan-300',
    btn: 'border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10',
    icon: 'text-cyan-500',
  },
  purple: {
    border: 'border-purple-400',
    glow: { boxShadow: '0 0 30px rgba(192,132,252,0.6), inset 0 0 30px rgba(192,132,252,0.05)' },
    badge: 'text-purple-400',
    price: 'text-purple-300',
    btn: 'border border-purple-400 text-purple-300 hover:bg-purple-400/10',
    icon: 'text-purple-500',
  },
  green: {
    border: 'border-emerald-400',
    glow: { boxShadow: '0 0 22px rgba(52,211,153,0.45), inset 0 0 22px rgba(52,211,153,0.04)' },
    badge: 'text-emerald-400',
    price: 'text-emerald-300',
    btn: 'border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10',
    icon: 'text-emerald-500',
  },
}

export default function PcBuildsModal({ open, onClose, openWhatsApp }) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Configuraciones de PC"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Armado de PCs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Elegí tu configuración
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Precios de referencia · Al confirmar, elegís estética y componentes finales.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-1 text-slate-500 hover:text-white transition-colors rounded p-1"
            aria-label="Cerrar"
          >
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PC_BUILDS.map((build) => {
            const neon = neonStyles[build.neon]

            return (
              <div
                key={build.id}
                className={`relative rounded-xl bg-zinc-950/85 border ${neon.border} p-6 flex flex-col`}
                style={neon.glow}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: "url('/images/soporte/fondo-lineas-poligonales.png')" }}
                  aria-hidden="true"
                />

                {build.popular && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-zinc-950/85 border border-purple-400 text-purple-300 text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap"
                    style={{ boxShadow: '0 0 10px rgba(192,132,252,0.5)' }}
                  >
                    ★ Más elegida
                  </span>
                )}

                <p className={`relative z-10 text-[10px] font-bold uppercase tracking-widest mb-1 ${neon.badge}`}>{build.tag}</p>
                <h3 className="relative z-10 text-xl font-bold text-white mb-4">{build.name}</h3>

                <p className={`relative z-10 text-4xl font-bold tabular-nums mb-0.5 ${neon.price}`}>{build.price}</p>
                <p className="relative z-10 text-xs text-slate-500 mb-1">{build.priceNote}</p>
                <p className="relative z-10 text-xs text-slate-600 mb-6">(depósito o transferencia)</p>

                <ul className="relative z-10 space-y-2.5 mb-8 flex-1">
                  {build.components.map((comp) => (
                    <li key={comp.label} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="w-8 h-8 rounded border border-slate-700 bg-slate-800 flex items-center justify-center shrink-0">
                        <i className={`${comp.icon} text-base ${neon.icon}`} />
                      </span>
                      <span className="font-mono tracking-wide text-xs">{comp.label}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openWhatsApp(undefined, build.msg)}
                  className={`relative z-10 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${neon.btn}`}
                >
                  {build.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          ¿Tenés un presupuesto diferente o necesidades específicas? 
          <button
            onClick={() => {
              openWhatsApp(
                undefined,
                'Hola, tengo un presupuesto específico para armar mi PC. ¿Podemos hablar?'
              )
              onClose()
            }}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            Armamos una configuración a medida.
          </button>
        </p>
      </div>
    </div>
  )
}
