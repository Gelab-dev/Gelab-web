'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

export default function Hero() {
  return (
    <section className={styles.section} id="inicio">

      <div className={styles.canvas}>
        <Scene />
      </div>

      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={styles.content}>

        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          Automatización IA · La Plata, Argentina
        </motion.div>

        <motion.h1 className={styles.title} {...fadeUp(0.1)}>
          Tu negocio en la<br />
          era de la{' '}
          <span className={styles.titleAccent}>IA.</span>
        </motion.h1>

        <motion.p className={styles.subtitle} {...fadeUp(0.2)}>
          — Construimos webs profesionales y automatizamos
          los procesos que te roban tiempo —
        </motion.p>

        <motion.div className={styles.actions} {...fadeUp(0.3)}>
          <a href="#contacto" className={styles.btnPrimary}>
            Quiero automatizar mi negocio
          </a>
          <a href="#servicios" className={styles.btnSecondary}>
            Ver servicios
          </a>
        </motion.div>

        <motion.p
          className={styles.stackNote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {'// Next.js · React Three Fiber · Claude API · Node.js'}
        </motion.p>

      </div>

    </section>
  )
}