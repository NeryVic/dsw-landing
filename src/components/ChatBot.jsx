"use client";

import React, { useState, useEffect } from "react";
import SimpleChatBot from "react-simple-chatbot";
import {steps} from "@/lib/constants";

export default function LandingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return null;

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#0070f3",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          💬
        </button>
      )}

      {/* ChatBot */}
      {isOpen && (
        <div style={{ position: "fixed", bottom: "100px", right: "24px", zIndex: 1000 }}>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#ff4444",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <SimpleChatBot
            steps={steps}
            headerTitle="Chat DSW 💬"
            placeholder="Escribe tu mensaje..."
            floating={false}
            width="350px"
            height="500px"
          />
        </div>
      )}
    </>
  );
}