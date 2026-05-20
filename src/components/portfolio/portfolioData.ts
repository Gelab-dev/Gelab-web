export type Category = 'todos' | 'web' | 'automatizacion'

export interface Project {
  id: string
  title: string
  client: string
  category: Category
  description: string
  problem: string
  solution: string
  tags: string[]
  url?: string
  demo?: boolean
  demoType?: 'chat'
  color: string
}

export const projects: Project[] = [
  {
    id: 'delvalle',
    title: 'Inmobiliaria Del Valle',
    client: 'Demo — Asistente IA',
    category: 'automatizacion',
    description: 'Asistente IA que atiende consultas de propiedades, coordina visitas y responde las 24 horas.',
    problem: 'Las inmobiliarias pierden leads fuera del horario de atención. Cada consulta sin respuesta es un cliente perdido.',
    solution: 'Agente IA entrenado con el catálogo de propiedades que atiende en tiempo real por WhatsApp o web.',
    tags: ['IA', 'Automatización', 'WhatsApp'],
    demo: true,
    demoType: 'chat',
    color: '#B847FF',
  },
  {
    id: 'nomade',
    title: 'Nómade Café',
    client: 'Nómade — Café de Especialidad',
    category: 'web',
    description: 'Presencia digital para un café de especialidad en la Patagonia Argentina.',
    problem: 'Nómade necesitaba una web que transmitiera la identidad de su marca y atrajera clientes en Trelew, Chubut.',
    solution: 'Diseño y desarrollo de sitio web a medida con identidad visual fuerte y experiencia mobile-first.',
    tags: ['Next.js', 'Diseño web', 'Mobile-first'],
    url: 'https://nomadecafe.ar',
    demo: false,
    color: '#B8FF47',
  },
  {
    id: 'vidriauto',
    title: 'Vidriauto',
    client: 'Vidriauto — Vidrios para Autos',
    category: 'web',
    description: 'Web corporativa para empresa distribuidora de cristales del automotor.',
    problem: 'Vidriauto perdía clientes por no tener presencia digital clara. Los usuarios no encontraban sus servicios online.',
    solution: 'Sitio web corporativo con catálogo de servicios, formulario de contacto y SEO local optimizado.',
    tags: ['Next.js', 'SEO', 'Web corporativa'],
    url: 'https://vidriauto.com.ar',
    demo: false,
    color: '#47B8FF',
  },
  {
    id: 'gimenos',
    title: "Gimeno's Painting",
    client: "Gimeno's Painting Services",
    category: 'web',
    description: 'Sitio web profesional para empresa de pintura en Gold Coast, Australia.',
    problem: 'La empresa necesitaba captar clientes en el mercado australiano con una presencia digital profesional en inglés.',
    solution: 'Web profesional orientada a conversión con galería de trabajos, testimonios y contacto directo.',
    tags: ['Next.js', 'Inglés', 'Conversión'],
    url: 'https://gimenos.com.au',
    demo: false,
    color: '#FF8C47',
  },
]