import { notion, DATABASE_ID } from '@/lib/notion'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Propuesta {
  slug: string
  nombreNegocio: string
  contacto: string
  rubro: string
  ciudad: string
  servicio: string
  dolor1Titulo: string
  dolor1Desc: string
  dolor2Titulo: string
  dolor2Desc: string
  descripcionSolucion: string
  entregables: string[]
  precio: string
  tiempoEntrega: string
  itemsIncluidos: string[]
  modalidadPago: string
  mantenimiento: string
  stack: string[]
  vencimiento: string
  activa: boolean
}

type NotionProperty = PageObjectResponse['properties'][string]

function getText(prop: NotionProperty | undefined): string {
  if (!prop) return ''
  if (prop.type === 'title') return prop.title?.[0]?.plain_text ?? ''
  if (prop.type === 'rich_text') return prop.rich_text?.[0]?.plain_text ?? ''
  if (prop.type === 'select') return prop.select?.name ?? ''
  if (prop.type === 'date') return prop.date?.start ?? ''
  if (prop.type === 'checkbox') return prop.checkbox ? 'true' : 'false'
  return ''
}

function getMultiSelect(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== 'multi_select') return []
  return prop.multi_select.map(s => s.name)
}

function parseLines(text: string): string[] {
  return text.split('\n').map(l => l.trim()).filter(Boolean)
}

async function getDataSourceId(): Promise<string> {
  const db = await notion.databases.retrieve({ database_id: DATABASE_ID })
  const dataSources = (db as { data_sources?: { id: string }[] }).data_sources
  if (!dataSources || dataSources.length === 0) {
    throw new Error('No data sources found for this database')
  }
  return dataSources[0].id
}

export async function getPropuestaBySlug(slug: string): Promise<Propuesta | null> {
  try {
    const dataSourceId = await getDataSourceId()

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: { equals: slug },
          },
          {
            property: 'Activa',
            checkbox: { equals: true },
          },
        ],
      },
    })

    if (response.results.length === 0) return null

    const page = response.results[0] as PageObjectResponse
    const p = page.properties

    return {
      slug,
      nombreNegocio:       getText(p['Nombre del negocio']),
      contacto:            getText(p['Contacto']),
      rubro:               getText(p['Rubro']),
      ciudad:              getText(p['Ciudad']),
      servicio:            getText(p['Servicio']),
      dolor1Titulo:        getText(p['Dolor 1 título']),
      dolor1Desc:          getText(p['Dolor 1 descripción']),
      dolor2Titulo:        getText(p['Dolor 2 título']),
      dolor2Desc:          getText(p['Dolor 2 descripción']),
      descripcionSolucion: getText(p['Descripción solución']),
      entregables:         parseLines(getText(p['Entregables'])),
      precio:              getText(p['Precio']),
      tiempoEntrega:       getText(p['Tiempo entrega']),
      itemsIncluidos:      parseLines(getText(p['Items incluidos'])),
      modalidadPago:       getText(p['Modalidad pago']),
      mantenimiento:       getText(p['Mantenimiento']),
      stack:               getMultiSelect(p['Stack']),
      vencimiento:         getText(p['Vencimiento']),
      activa:              getText(p['Activa']) === 'true',
    }
  } catch (error) {
    console.error('Error fetching propuesta:', error)
    return null
  }
}