'use client'

import { motion } from 'framer-motion'
import styles from './Servicios.module.css'

const services = [
  {
    badge: 'Web',
    badgeType: 'gray',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sitio web profesional',
    desc: 'Un sitio rápido, moderno y a medida que convierte visitas en clientes.',
    features: [
      'Diseño personalizado',
      'Next.js + deploy en Vercel',
      'SEO básico incluido',
      'Dominio y hosting',
    ],
    featured: false,
  },
  {
    badge: 'App',
    badgeType: 'gray',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 8h2m2 0h2m2 0h2" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 11h4" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Aplicación web a medida',
    desc: 'Un sistema que resuelve un problema específico de tu negocio. Desde reservas y turnos hasta paneles de gestión completos.',
    features: [
      'Diseño y desarrollo a medida',
      'Base de datos + Admin Panel',
      'Integraciones',
      'Acceso desde cualquier dispositivo',
    ],
    featured: false,
  },
  {
    badge: '⚡ Más pedido',
    badgeType: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M8 6V4M16 6V4" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="13" r="1.5" fill="#B8FF47"/>
        <circle cx="15" cy="13" r="1.5" fill="#B8FF47"/>
        <path d="M9 17h6" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Asistente con IA',
    desc: 'Un agente inteligente que atiende, responde y gestiona por vos, las 24 horas.',
    features: [
      'Chatbot para WhatsApp o web',
      'Respuestas automáticas',
      'Integración con tu negocio',
      'Panel de conversaciones',
    ],
    featured: true,
  },
  {
    badge: 'Pack',
    badgeType: 'gray',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#B8FF47" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Pack completo',
    desc: 'Web + IA + soporte. Todo lo que tu negocio necesita para digitalizarse de una vez.',
    features: [
      'Web profesional incluida',
      'Asistente IA configurado',
      '1 mes de soporte',
      'Capacitación al equipo',
    ],
    featured: false,
  },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function Servicios() {
  return (
    <section className={styles.section} id="servicios">
      <div className={styles.inner}>

        <motion.div {...fadeUp(0)}>
          <span className={styles.tag}>{'// 01 — servicios'}</span>
          <h2 className={styles.title}>
            Lo que hacemos<br />por tu empresa.
          </h2>
          <p className={styles.subtitle}>
            Tres servicios diseñados para quienes buscan
            resultados reales.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className={`${styles.card} ${service.featured ? styles.cardFeatured : ''}`}
              {...fadeUp(i * 0.1)}
            >
              <span className={`${styles.badge} ${
                service.badgeType === 'green' ? styles.badgeGreen : styles.badgeGray
              }`}>
                {service.badge}
              </span>

              <div className={styles.icon}>{service.icon}</div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>

              <ul className={styles.features}>
                {service.features.map((f) => (
                  <li key={f} className={styles.feature}>{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.footer} {...fadeUp(0.3)}>
          <div className={styles.footerCopy}>
            <span className={styles.footerEyebrow}>{'// inversión'}</span>
            <span className={styles.footerText}>
              Cada proyecto es único. Agendá una llamada
              y en 30 minutos te damos una propuesta a medida.
            </span>
          </div>
          <a href="#contacto" className={styles.footerBtn}>
            Quiero mi propuesta →
          </a>
        </motion.div>

      </div>
    </section>
  )
}