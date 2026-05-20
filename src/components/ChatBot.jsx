"use client";

import React, { useState, useEffect, useRef } from "react";

const CHAT_MESSAGES = {
  inicio: {
    text: "¡Hola! 👋 Soy el asistente virtual de DSW. ¿En qué puedo ayudarte?",
    options: [
      { label: "🌐 Servicios web", value: "servicios-web" },
      { label: "⚙️ Sistemas a medida", value: "sistemas" },
      { label: "🛠️ Soporte técnico", value: "soporte" },
      { label: "📍 Contacto y ubicación", value: "contacto" },
      { label: "🤖 Pregunta con IA", value: "ai-mode" },
    ],
  },
  "servicios-web": {
    text: "Desarrollamos webs orientadas a resultados: landing pages de conversión, sitios institucionales y tiendas ecommerce. Diseño profesional, SEO técnico y enfoque en captar clientes.",
    options: [
      { label: "Quiero cotizar mi web", value: "cotizar" },
      { label: "Tengo otra pregunta", value: "inicio" },
    ],
  },
  sistemas: {
    text: "Creamos sistemas a medida para automatizar tareas repetitivas, centralizar información y escalar tu operación: CRMs, sistemas de gestión, integraciones y más. Siempre adaptado a tu proceso real.",
    options: [
      { label: "Solicitar diagnóstico gratuito", value: "cotizar" },
      { label: "Tengo otra pregunta", value: "inicio" },
    ],
  },
  soporte: {
    text: "Ofrecemos soporte técnico para pymes: mantenimiento preventivo, soporte correctivo, armado y actualización de PCs. Atención presencial en Formosa y Chaco; remoto para otras zonas.",
    options: [
      { label: "💻 ¿Qué PCs arman?", value: "pcs" },
      { label: "Tengo otra pregunta", value: "inicio" },
    ],
  },
  pcs: {
    text: "Armamos 3 configuraciones de referencia:\n• Oficina – USD 470 (Ryzen 3 4100, 8 GB DDR4, SSD 512 GB)\n• Profesional – USD 680 (Ryzen 5 8600G, 16 GB DDR5, SSD 1 TB)\n• Gamer – USD 1.050 (Ryzen 7 8700G, 32 GB DDR5, RX 7600 8 GB)\nPrecios en pesos al cambio del día. Podés personalizar componentes al confirmar.",
    options: [
      { label: "Coordinar armado de PC", value: "cotizar" },
      { label: "Tengo otra pregunta", value: "inicio" },
    ],
  },
  contacto: {
    text: "Podés contactarnos por WhatsApp (botón verde en la web), completando el formulario de contacto, o por email a digitalsolutionsweb3.0@gmail.com. Trabajamos de forma remota con clientes de toda Latinoamérica. 🌎",
    options: [
      { label: "Tengo otra pregunta", value: "inicio" },
      { label: "No, gracias", value: "fin" },
    ],
  },
  cotizar: {
    text: "Para cotizar, contactanos por WhatsApp (botón verde en la web) o completá el formulario de contacto. Te respondemos rápido y sin compromiso. 😊",
    options: [
      { label: "Tengo otra pregunta", value: "inicio" },
      { label: "Cerrar", value: "fin" },
    ],
  },
  fin: {
    text: "¡Perfecto! Estamos aquí cuando nos necesites. ¡Que tengas un excelente día! 😊",
    options: [],
  },
  "ai-mode": {
    text: "¡Perfecto! Ahora podés hacerme cualquier pregunta sobre DSW y te responderé con IA. 🤖",
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
      {/* Botón flotante cerrado */}
      {!isOpen && (
        <div className="fixed bottom-24 right-9 md:right-20 z-[999] flex flex-col items-end gap-2.5">
          {/* Bubble tooltip */}
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <i className="ri-message-3-fill text-2xl" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[9px] font-bold text-white">1</span>
          </button>
        </div>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-[360px] h-[75vh] max-h-[560px] md:bottom-6 md:right-6 rounded-2xl shadow-2xl shadow-black/40 z-[1000] flex flex-col overflow-hidden border border-slate-700/50">

          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center gap-3 border-b border-slate-700/60 shrink-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                <i className="ri-robot-2-line text-base" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">Asistente DSW</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">En línea</p>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Cerrar chat"
            >
              <i className="ri-close-line text-base" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.map((msg, index) => (
              <div key={`${msg.timestamp}-${index}`}>
                {msg.type === "bot" ? (
                  <div className="flex items-start gap-2.5">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                      <i className="ri-robot-2-line text-xs text-blue-400" />
                    </div>
                    <div className="max-w-[82%]">
                      <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-slate-100 leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {msg.options.map((option, optIndex) => (
                            <button
                              key={`${msg.timestamp}-opt-${optIndex}`}
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-left px-3.5 py-2 bg-slate-800/60 hover:bg-blue-600/15 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 rounded-xl text-sm transition-all duration-150"
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
                    <div className="max-w-[80%] bg-blue-600 rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm shadow-blue-900/40">
                      <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="shrink-0 w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                  <i className="ri-robot-2-line text-xs text-blue-400" />
                </div>
                <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input para modo IA */}
          {aiMode && (
            <div className="p-3 border-t border-slate-700/60 bg-slate-900 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAiQuestion()}
                  placeholder="Escribe tu pregunta..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-blue-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 disabled:opacity-50 transition-colors"
                />
                <button
                  onClick={handleAiQuestion}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl text-sm transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <i className="ri-send-plane-fill text-base" />
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}