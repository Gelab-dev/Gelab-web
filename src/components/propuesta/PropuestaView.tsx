'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/ui/Footer'
import type { Propuesta } from '@/services/propuestas.service'
import styles from './PropuestaView.module.css'
import {
    IconAlertCircle,
    IconClockOff,
    IconBolt,
    IconHeadset,
    IconRocket,
    IconUsers,
    IconTrendingUp,
    IconCalendar,
    IconBrandWhatsapp,
    IconCheck,
    IconCreditCard,
    IconRefresh,
    IconDownload,
  } from '@tabler/icons-react'
import Link from 'next/link'


const WHATSAPP_NUMBER = '5492804353853'
const CAL_LINK = 'https://cal.com/gelab.dev/llamada-inicial'

const SERVICE_SUBTITLE: Record<string, string> = {
  'Automatización IA':  'para tu negocio.',
  'Desarrollo web':     'que convierte visitas.',
  'Aplicación web':     'hecha a tu medida.',
  'Pack completo':      'para dar el salto digital.',
}

const DIFFERENTIATORS = [
    { icon: <IconBolt size={17} />,        label: 'Entrega rápida' },
    { icon: <IconHeadset size={17} />,     label: 'Soporte post-entrega' },
    { icon: <IconRocket size={17} />,      label: 'Tecnología pensada para crecer' },
    { icon: <IconUsers size={17} />,       label: 'Capacitación al personal' },
    { icon: <IconTrendingUp size={17} />,  label: 'Soluciones que escalan' },
  ]

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left:     `${Math.random() * 100}%`,
  size:     `${Math.random() * 3 + 1}px`,
  duration: `${Math.random() * 12 + 8}s`,
  delay:    `${Math.random() * 8}s`,
  opacity:  Math.random() * 0.4 + 0.1,
}))

const fadeUp = {
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6 },
}

const fadeLeft = {
  initial:    { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6 },
}

const fadeRight = {
  initial:    { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6 },
}

const formatFecha = (iso: string) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

interface Props {
  propuesta: Propuesta
}

export default function PropuestaView({ propuesta: p }: Props) {
  const particlesRef = useRef<HTMLDivElement>(null)

  const [scrolled, setScrolled] = useState(false)
  const [generandoPDF, setGenerandoPDF] = useState(false)

  const handleDownloadPDF = () => {
    // Fuerza todas las secciones animadas a ser visibles
    const style = document.createElement('style')
    style.id = 'print-override'
    style.innerHTML = `
      * {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
    `
    document.head.appendChild(style)
    
    window.print()
    
    // Limpia el estilo después de imprimir
    setTimeout(() => {
      document.getElementById('print-override')?.remove()
    }, 1000)
  }



  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 40)
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!particlesRef.current) return
    PARTICLES.forEach(pt => {
      const el = document.createElement('div')
      el.className = styles.particle
      el.style.left         = pt.left
      el.style.width        = pt.size
      el.style.height       = pt.size
      el.style.animationDuration = pt.duration
      el.style.animationDelay    = pt.delay
      el.style.opacity      = String(pt.opacity)
      particlesRef.current?.appendChild(el)
    })
  }, [])

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola! Vi la propuesta de Gelab para ${p.nombreNegocio} y quiero consultarles algo.`
  )}`

  const subtitle = SERVICE_SUBTITLE[p.servicio] ?? 'para tu negocio.'

  return (
    <div className={styles.page}>

      <div ref={particlesRef} className={styles.particles} aria-hidden="true" />

        {/* NAVBAR */}
        <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
            <Link href="/" className={styles.navLogo}>
                <span className={styles.navLogoAccent}>G</span>elab
            </Link>
            <button
                className={styles.navDownload}
                onClick={handleDownloadPDF}
                disabled={generandoPDF}
                aria-label="Descargar PDF"
            >
                <IconDownload size={15} />
                <span className={styles.navDownloadLabel}>
                    {generandoPDF ? 'Generando...' : 'Descargar PDF'}
                </span>
            </button>
        </nav>

        <div className={styles.inner} id="propuesta-content">

        {/* PORTADA */}
        <div className={styles.cover}>
        <div className={styles.coverTop}>
            <span className={styles.coverDate}>
                {formatFecha(new Date().toISOString())}
            </span>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <span className={styles.coverTag}>{'// propuesta comercial'}</span>
            <h1 className={styles.coverTitle}>
                {p.servicio || 'Propuesta de servicios'}<br />
                <span style={{ color: '#B8FF47' }}>{subtitle}</span>
            </h1>
            <p className={styles.coverClient}>
                {p.nombreNegocio}
                {p.ciudad ? ` · ${p.ciudad}` : ''}
            </p>
        </motion.div>

        <div className={styles.coverDivider} />
        </div>

        {/* EL PROBLEMA */}
        {(p.dolor1Titulo || p.dolor2Titulo) && (
          <motion.section className={styles.section} {...fadeLeft}>
            <span className={styles.secTag}>{'// 01 — el problema'}</span>
            <h2 className={styles.secTitle}>
              Lo que vimos al analizar<br />tu negocio
            </h2>
            {p.dolor1Titulo && (
              <div className={styles.painCard}>
                <div className={styles.painIcon}>
                    <IconAlertCircle size={17} />
                    </div>
                <div>
                  <div className={styles.painTitle}>{p.dolor1Titulo}</div>
                  <div className={styles.painDesc}>{p.dolor1Desc}</div>
                </div>
              </div>
            )}
            {p.dolor2Titulo && (
              <div className={styles.painCard}>
                <div className={styles.painIcon}>
                    <IconClockOff size={17} />
                </div>
                <div>
                  <div className={styles.painTitle}>{p.dolor2Titulo}</div>
                  <div className={styles.painDesc}>{p.dolor2Desc}</div>
                </div>
              </div>
            )}
          </motion.section>
        )}

        {/* LA SOLUCIÓN */}
        {(p.descripcionSolucion || p.entregables.length > 0) && (
          <motion.section className={styles.section} {...fadeRight}>
            <span className={styles.secTag}>{'// 02 — la solución'}</span>
            <h2 className={styles.secTitle}>
              Lo que vamos a<br />construir para vos
            </h2>
            {p.descripcionSolucion && (
              <p className={styles.secBody}>{p.descripcionSolucion}</p>
            )}
            {p.entregables.length > 0 && (
              <div className={styles.deliverables}>
                {p.entregables.map((item, i) => (
                  <div key={i} className={styles.deliverable}>
                    <span className={styles.deliverableDot} />
                    {item}
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* PROCESO */}
        <motion.section className={styles.section} {...fadeUp}>
          <span className={styles.secTag}>{'// 03 — cómo lo hacemos'}</span>
          <h2 className={styles.secTitle}>
            Simple, rápido<br />y sin interrupciones
          </h2>
          <div className={styles.processSteps}>
            {[
              { num: '01', label: 'Diagnóstico',   sub: 'Relevamos tu negocio y flujos actuales' },
              { num: '02', label: 'Configuración', sub: 'Diseñamos y construimos la solución' },
              { num: '03', label: 'Pruebas',       sub: 'Probamos juntos antes de salir en vivo' },
              { num: '04', label: 'Lanzamiento',   sub: 'Activamos y hacemos seguimiento' },
            ].map(s => (
              <div key={s.num} className={styles.procStep}>
                <div className={styles.procNum}>{s.num}</div>
                <div className={styles.procLabel}>{s.label}</div>
                <div className={styles.procSub}>{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* INVERSIÓN */}
        {p.precio && (
          <motion.section className={styles.section} {...fadeLeft}>
            <span className={styles.secTag}>{'// 04 — inversión'}</span>
            <h2 className={styles.secTitle}>
              Lo que incluye<br />y cuánto cuesta
            </h2>
            <div className={styles.investCard}>
              <div>
                <div className={styles.investLabel}>inversión</div>
                <div className={styles.investPrice}>{p.precio}</div>
                {p.tiempoEntrega && (
                  <div className={styles.investSub}>
                    entrega en {p.tiempoEntrega}
                  </div>
                )}
              </div>
              {p.itemsIncluidos.length > 0 && (
                <div className={styles.investIncludes}>
                  {p.itemsIncluidos.map((item, i) => (
                    <div key={i} className={styles.investItem}>
                        <IconCheck size={14} />
                        {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {p.modalidadPago && (
              <div className={styles.paymentRow}>
                <IconCreditCard size={14} />
                {p.modalidadPago}
              </div>
            )}
            {p.mantenimiento && (
              <div className={styles.maintenanceRow}>
                <IconRefresh size={14} />
                {p.mantenimiento}
              </div>
            )}
          </motion.section>
        )}

        {/* POR QUÉ GELAB */}
        <motion.section className={styles.section} {...fadeRight}>
          <span className={styles.secTag}>{'// 05 — por qué elegirnos'}</span>
          <h2 className={styles.secTitle}>
            Lo que traemos<br />a cada proyecto
          </h2>
          <div className={styles.differentiators}>
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={d.label}
                className={styles.diffCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={styles.diffIcon}>
                    {d.icon}
                </div>
                <span className={styles.diffLabel}>{d.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className={styles.section} {...fadeUp}>
          <span className={styles.secTag}>{'// 06 — próximo paso'}</span>
          <div className={styles.ctaCard}>
            <div className={styles.ctaText}>
              <div className={styles.ctaTitle}>{'¿Empezamos?'}</div>
              <div className={styles.ctaSub}>
                Contanos qué te pareció.<br />Cualquier duda o ajuste, estamos a un mensaje.
              </div>
            </div>
            <div className={styles.ctaActions}>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                    <IconCalendar size={16} />
                    Agendar llamada
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                    <IconBrandWhatsapp size={16} />
                    WhatsApp
                </a>
            </div>
          </div>
        </motion.section>

      </div>

      <Footer />
    </div>
  )
}