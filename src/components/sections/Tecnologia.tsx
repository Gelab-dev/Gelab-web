'use client'

import { motion } from 'framer-motion'
import styles from './Tecnologia.module.css'

const techs = [
  {
    name: 'Next.js',
    main: true,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M15 8l-6 8M9 8h4.5M15 16h-4.5" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'React',
    main: true,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#B8FF47"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#B8FF47" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#B8FF47" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#B8FF47" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: 'Claude API',
    main: true,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M9 9l3 3-3 3M13 15h3" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    main: true,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="#B8FF47" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Three.js',
    main: false,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 19h18L12 3z" stroke="#B8FF47" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 14h9M9 11h6" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    main: false,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M6 12c0-3 1.5-4.5 4.5-4.5S15 9 15 12s-1.5 4.5-4.5 4.5" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13.5 12c0-3 1.5-4.5 4.5-4.5" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    main: false,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L22 20H2L12 3z" fill="#B8FF47"/>
      </svg>
    ),
  },
  {
    name: 'Make / n8n',
    main: false,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <circle cx="19" cy="12" r="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <circle cx="12" cy="6" r="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <circle cx="12" cy="18" r="2" stroke="#B8FF47" strokeWidth="1.5"/>
        <path d="M7 12h5M14 8l-2 4M14 16l-2-4" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp API',
    main: false,
    icon: (
      <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#B8FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Tecnologia() {
  return (
    <section className={styles.section} id="tecnologia">
      <div className={styles.inner}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>{'// 03 — tecnología'}</span>
          <h2 className={styles.title}>
            Herramientas de<br />nivel enterprise.
          </h2>
          <p className={styles.subtitle}>
            Las mismas tecnologías que usan las startups más
            exitosas del mundo — aplicadas a tu PyME.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {techs.map((tech) => (
            <div
              key={tech.name}
              className={`${styles.badge} ${tech.main ? styles.badgeMain : ''}`}
            >
              {tech.icon}
              {tech.name}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}