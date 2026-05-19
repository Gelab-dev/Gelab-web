'use client'

import { motion } from 'framer-motion'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <>
      <section className={styles.section} id="contacto">
        <div className={styles.glow} />
        <div className={styles.inner}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Listo para automatizar tu negocio?
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hablemos 30 minutos. Sin compromiso, sin tecnicismos.
          </motion.p>
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://cal.com/gelab.dev/llamada-inicial"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
             {'Agendar una llamada →'}
            </a>
            <a
              href="https://wa.me/5492804353853"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Escribir por WhatsApp
            </a>
          </motion.div>
          <motion.p
            className={styles.note}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            respondo en menos de 24 horas - La Plata, Buenos Aires
          </motion.p>
        </div>
      </section>
    </>
  )
}