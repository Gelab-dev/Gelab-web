import type { Metadata } from 'next'
import { Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Gelab — Automatizamos PyMEs argentinas con IA',
  description: 'Desarrollo web profesional y automatización con inteligencia artificial para pequeñas y medianas empresas argentinas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  )
}