'use client'

import { motion } from 'framer-motion'
import styles from './Proceso.module.css'

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Entendemos tu negocio, tus procesos y dónde perdés más tiempo.',
  },
  {
    num: '02',
    title: 'Diseño',
    desc: 'Planificamos la solución exacta antes de escribir una línea de código.',
  },
  {
    num: '03',
    title: 'Desarrollo',
    desc: 'Construimos, configuramos y probamos todo, incluyendo tu feedback en cada paso.',
  },
  {
    num: '04',
    title: 'Entrega',
    desc: 'Deploy, capacitación y soporte para que arranques sin problemas.',
  },
]

export default function Proceso() {
  return (
    <section className={styles.section} id="proceso">
      <div className={styles.inner}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>{'// 03 — proceso'}</span>
          <h2 className={styles.title}>
            Simple, claro,<br />sin sorpresas.
          </h2>
          <p className={styles.subtitle}>
            Cuatro pasos que llevan tu empresa del problema
            a la solución en menos de 3 semanas.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepDesc}>{step.desc}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}