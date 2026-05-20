import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const INMOBILIARIA_PROMPT = `Sos el asistente virtual de Inmobiliaria Del Valle, 
una inmobiliaria ubicada en La Plata, Buenos Aires, Argentina.

Tu rol es atender consultas de clientes de forma amigable, 
profesional y en español argentino.

INFORMACIÓN DE LA INMOBILIARIA:
- Nombre: Inmobiliaria Del Valle
- Horarios: Lunes a Viernes de 9:00 a 18:00hs, Sábados de 9:00 a 13:00hs
- Teléfono: (221) 555-0100
- Email: info@delvalle.com.ar

PROPIEDADES DISPONIBLES:

ALQUILERES:
- Depto 2 ambientes, Calle 13 entre 44 y 45, La Plata. $580.000/mes. Piso 3, balcón.
- Depto 3 ambientes, Av. 7 y 50, La Plata. $750.000/mes. Luminoso, cochera incluida.
- Casa 3 dormitorios, Calle 23 e/ 71 y 72, La Plata. $920.000/mes. Jardín y garage.
- Monoambiente, Calle 48 e/ 6 y 7, La Plata. $330.000/mes. Ideal estudiantes.

VENTAS:
- Depto 2 ambientes, Calle 10 y 51. USD 65.000. A estrenar.
- Casa 4 dormitorios, City Bell. USD 185.000. Barrio cerrado, pileta.
- Terreno 300m², Gonnet. USD 45.000. Apto construcción.

REQUISITOS PARA ALQUILAR:
- 2 recibos de sueldo y garantía propietaria
- DNI y referencias laborales
- Depósito equivalente a 1 mes de alquiler

REGLAS:
- Respondé de forma clara y concisa
- Si preguntan por una propiedad que no tenés, deciles 
  que pueden dejar sus datos y los contactan cuando haya disponibilidad
- Si quieren coordinar una visita, pediles nombre, 
  teléfono y qué propiedad les interesa
- Nunca inventes información que no está en este prompt
- Usá saltos de línea entre párrafos
- Para listas de propiedades usá viñetas con •
- Mantené las respuestas cortas y fáciles de leer
- No uses markdown como ** o ## ya que se muestra como texto plano
- Cerrá siempre con buena onda`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: INMOBILIARIA_PROMPT,
    })

    // Excluir el primer mensaje del asistente del historial
    // Gemini requiere que el historial empiece con 'user'
    const chatHistory = history
      .filter((_: { role: string; content: string }, i: number) => i > 0)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))

    const chat = model.startChat({ history: chatHistory })

    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    return NextResponse.json({ reply })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
}