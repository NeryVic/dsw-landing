import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje es requerido' },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente virtual amigable para Digital Solutions Web (DSW), una empresa de desarrollo web ubicada en Formosa, Argentina. Ayudas a los clientes con información sobre servicios (desarrollo web, diseño UI/UX, sistemas POS, ecommerce, sistemas de reservas), precios, contacto y ubicación. Sé conciso y amigable. Email de contacto: digitalsolutionsweb3.0@gmail.com'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de OpenAI:', data);
      return NextResponse.json(
        { error: 'Error al procesar la solicitud' },
        { status: response.status }
      );
    }

    const answer = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
