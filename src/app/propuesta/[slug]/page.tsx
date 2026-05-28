import { notFound } from 'next/navigation'
import { getPropuestaBySlug } from '@/services/propuestas.service'
import PropuestaView from '@/components/propuesta/PropuestaView'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropuestaPage({ params }: Props) {
  const { slug } = await params
  const propuesta = await getPropuestaBySlug(slug)

  if (!propuesta) notFound()

  return <PropuestaView propuesta={propuesta} />
}