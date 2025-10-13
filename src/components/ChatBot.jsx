"use client";

import React, { useState, useEffect, useRef } from "react";

const CHAT_MESSAGES = {
  inicio: {
    text: "¡Hola! 👋 Soy el asistente virtual de DSW. ¿En qué puedo ayudarte?",
    options: [
      { label: "🛠️ ¿Qué servicios ofrecen?", value: "servicios" },
      { label: "📞 ¿Cómo los contacto?", value: "contacto" },
      { label: "📍 ¿Dónde están ubicados?", value: "ubicacion" },
      { label: "💰 ¿Cuánto cuestan sus servicios?", value: "precios" },
    ],
  },
  servicios: {
    text: "Ofrecemos desarrollo web, diseño UI/UX, consultoría digital, y soluciones personalizadas para tu negocio. ¿Te gustaría saber más sobre algún servicio específico?",
    options: [
      { label: "Sí, tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  contacto: {
    text: "Puedes contactarnos a través del formulario en esta página, por WhatsApp haciendo clic en el botón flotante, o enviando un email a digitalsolutionsweb3.0@gmail.com",
    options: [
      { label: "Sí, tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  ubicacion: {
    text: "Estamos ubicados en Formosa, Argentina, pero trabajamos de forma remota con clientes de toda Latinoamérica. 🌎",
    options: [
      { label: "Sí, tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  precios: {
    text: "Nuestros precios varían según el proyecto. Te recomendamos contactarnos para obtener una cotización personalizada y sin compromiso.",
    options: [
      { label: "Sí, tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  fin: {
    text: "¡Perfecto! Estamos aquí cuando nos necesites. ¡Que tengas un excelente día! 🚀",
    options: [],
  },
};

export default function LandingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("inicio");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Iniciar conversación
      addBotMessage(CHAT_MESSAGES.inicio.text, CHAT_MESSAGES.inicio.options);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text, options) => {
    setMessages((prev) => [
      ...prev,
      { type: "bot", text, options, timestamp: Date.now() },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text, timestamp: Date.now() }]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option.label);

    setTimeout(() => {
      const nextStep = CHAT_MESSAGES[option.value];
      if (nextStep) {
        addBotMessage(nextStep.text, nextStep.options);
        setCurrentStep(option.value);
      }
    }, 500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setCurrentStep("inicio");
  };


  if (!isMounted) return null;

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[100px] right-6 w-[60px] h-[60px] rounded-full bg-blue-600 hover:bg-blue-700 text-white text-2xl shadow-lg hover:scale-110 transition-transform z-[999] flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-6 w-[350px] h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-[1000] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold">Chat DSW 💬</h3>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div key={`${msg.timestamp}-${index}`}>
                {msg.type === "bot" ? (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-white dark:bg-gray-700 rounded-lg p-3 shadow">
                      <p className="text-sm text-gray-800 dark:text-gray-100">{msg.text}</p>
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.options.map((option, optIndex) => (
                            <button
                              key={`${msg.timestamp}-opt-${optIndex}`}
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-lg text-sm transition-colors"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-blue-600 text-white rounded-lg p-3 shadow">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}