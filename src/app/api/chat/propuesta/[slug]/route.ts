import { NextRequest, NextResponse } from 'next/server'
import { getPropuestaBySlug } from '@/services/propuestas.service'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const propuesta = await getPropuestaBySlug(slug)

  if (!propuesta) {
    return NextResponse.json({ error: 'Propuesta no encontrada' }, { status: 404 })
  }

  return NextResponse.json({ propuesta })
}