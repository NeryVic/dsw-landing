"use client";

import React, { useState, useEffect, useRef } from "react";

const CHAT_MESSAGES = {
  inicio: {
    text: "¡Hola! 👋 Soy el asistente virtual de DSW. ¿En qué puedo ayudarte?",
    options: [
      { label: " ¿Qué servicios ofrecen?", value: "servicios" },
      { label: " ¿Cómo los contacto?", value: "contacto" },
      { label: " ¿Dónde están ubicados?", value: "ubicacion" },
      { label: " ¿Cuánto cuestan sus servicios?", value: "precios" },
      { label: "🤖 Pregunta con IA", value: "ai-mode" },
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
    text: "Nuestros precios varían según la complejidad del proyecto. Te recomendamos contactarnos para obtener una cotización personalizada y sin compromiso.",
    options: [
      { label: "Sí, tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  fin: {
    text: "¡Perfecto! Estamos aquí cuando nos necesites. ¡Que tengas un excelente día! 😊",
    options: [],
  },
  "ai-mode": {
    text: "¡Perfecto! Ahora puedes hacerme cualquier pregunta y te responderé usando IA. 🤖",
    options: [],
    enableInput: true,
  },
};

export default function LandingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("inicio");
  const [aiMode, setAiMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // Historial para IA, formato [{ role: 'user'|'assistant', content: string }]
  const [aiHistory, setAiHistory] = useState([]);

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
        if (option.value === "ai-mode") {
          setAiMode(true);
        }
        addBotMessage(nextStep.text, nextStep.enableInput ? [] : nextStep.options);
        setCurrentStep(option.value);
        // Si el usuario vuelve al inicio, salir de AI mode
        if (option.value === "inicio") {
          setAiMode(false);
        }
      }
    }, 500);
  };

  const handleAiQuestion = async () => {
    if (!inputValue.trim() || isLoading) return;

    const question = inputValue.trim();
    setInputValue("");
    addUserMessage(question);
    setIsLoading(true);
    // Construir historial saliente incluyendo la nueva pregunta
    const outgoingHistory = [...aiHistory, { role: 'user', content: question }];
    // Actualizar historial local inmediatamente para coherencia en UI
    setAiHistory(outgoingHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: outgoingHistory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          addBotMessage(data.answer, [
            { label: "Hacer otra pregunta", value: "ai-mode" },
            { label: "Volver al menú principal", value: "inicio" },
          ]);
          // Registrar respuesta del asistente en historial
          setAiHistory((prev) => [...prev, { role: 'assistant', content: data.answer }]);
          setIsLoading(false);
        }, 500);
      } else {
        if (response.status === 429) {
          addBotMessage(
            data.error || "Estás enviando muchas solicitudes seguidas. Espera unos segundos e intenta nuevamente.",
            [
              { label: "Intentar de nuevo", value: "ai-mode" },
              { label: "Volver al menú principal", value: "inicio" },
            ]
          );
          setIsLoading(false);
          return;
        }
        if (response.status === 413) {
          addBotMessage(
            data.error || "Tu mensaje es muy largo. Por favor, resume tu consulta.",
            [
              { label: "Intentar de nuevo", value: "ai-mode" },
              { label: "Volver al menú principal", value: "inicio" },
            ]
          );
          setIsLoading(false);
          return;
        }
        if (response.status === 403) {
          addBotMessage(
            data.error || "No puedes usar este chat desde este origen.",
            [
              { label: "Volver al menú principal", value: "inicio" },
            ]
          );
          setIsLoading(false);
          return;
        }
        throw new Error(data.error || "Error al procesar");
      }
    } catch (error) {
      setTimeout(() => {
        addBotMessage(
          "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.",
          [
            { label: "Intentar de nuevo", value: "ai-mode" },
            { label: "Volver al menú principal", value: "inicio" },
          ]
        );
        setIsLoading(false);
      }, 500);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setCurrentStep("inicio");
    setAiMode(false);
    setInputValue("");
    setIsLoading(false);
    setAiHistory([]);
  };


  if (!isMounted) return null;

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-22 right-9 z-0 md:right-20 w-[60px] h-[60px] rounded-full bg-blue-600 hover:bg-blue-700 text-white text-2xl shadow-lg hover:scale-110 transition-transform z-[999] flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-[calc(100%-2.5rem)] h-[70vh] max-w-[350px] max-h-[500px] md:bottom-[100px] md:right-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-[1000] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold">Asistente 💬</h3>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              x
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-white dark:bg-gray-700 rounded-lg p-3 shadow">
                  <p className="text-sm text-gray-800 dark:text-gray-100">Escribiendo...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input para modo IA */}
          {aiMode && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAiQuestion()}
                  placeholder="Escribe tu pregunta..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
                <button
                  onClick={handleAiQuestion}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm transition-colors disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : "→"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}