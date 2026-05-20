'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from './portfolioData'
import DemoChat from './DemoChat'
import styles from './ProjectModal.module.css'

const categoryLabel: Record<string, string> = {
  web: '// web',
  automatizacion: '// automatización IA',
}

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [showDemo, setShowDemo] = useState(false)

  if (showDemo) {
    return <DemoChat onClose={() => setShowDemo(false)} />
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span
                className={styles.category}
                style={{ color: project.color }}
              >
                {categoryLabel[project.category]}
              </span>
              <h2 className={styles.title}>{project.title}</h2>
              <span className={styles.client}>{project.client}</span>
            </div>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <span className={styles.blockLabel}>El problema</span>
            <p className={styles.blockText}>{project.problem}</p>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>La solución</span>
            <p className={styles.blockText}>{project.solution}</p>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>Tecnologías</span>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            {project.demo ? (
              <button
                className={styles.btnPrimary}
                onClick={() => setShowDemo(true)}
              >
                {'Probar demo en vivo →'}
              </button>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                {'Ver sitio web →'}
              </a>
            )}
            <button className={styles.btnSecondary} onClick={onClose}>
              Volver al portfolio
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}