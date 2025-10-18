'use client'

import React, { useRef } from 'react'
import { featuresData } from '@/data/features'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { useGsapStagger } from '@/hooks/useGsapStagger'

const FeatureIcons = {
  'speed': <i className="ri-flashlight-line text-2xl text-blue-600"></i>,
  'user-friendly': <i className="ri-user-smile-line text-2xl text-blue-600"></i>,
  'security': <i className="ri-shield-check-line text-2xl text-blue-600"></i>,
  'support': <i className="ri-customer-service-line text-2xl text-blue-600"></i>
}

// ✅ Definir opciones fuera del componente (constante estática)
const FEATURES_ANIMATION = {
  opacity: 0,
  y: -30,
  duration: 0.7,
  stagger: { amount: 0.5, from: 'start' },
  ease: 'power2.inOut'
}

export default function FeaturesSection() {
  const gridRef = useRef(null)
  useGsapStagger(gridRef, '.feature-item', FEATURES_ANIMATION)

  return (
    <section id="features" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Características que marcan la diferencia
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubre las herramientas y funcionalidades que hacen que nuestra solución 
            sea la elección perfecta para tu negocio.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <Card key={feature.id} className="text-center hover:shadow-lg transition-shadow duration-300 feature-item">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {FeatureIcons[feature.icon]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <div className="mt-20 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Tecnología de vanguardia al servicio de tu éxito
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Utilizamos las últimas tecnologías y mejores prácticas de la industria 
                para garantizar que tu solución sea robusta, escalable y eficiente.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  API REST completamente documentada
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Arquitectura escalable en la nube
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Seguridad de nivel empresarial
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Integración con herramientas populares
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-xl p-8 text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">
                  <i className="ri-bar-chart-2-line"></i>
                </div>
                <h4 className="text-2xl font-bold mb-2">Analytics en Tiempo Real</h4>
                <p className="text-blue-100">
                  Monitorea el rendimiento de tu aplicación con dashboards interactivos 
                  y métricas en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}