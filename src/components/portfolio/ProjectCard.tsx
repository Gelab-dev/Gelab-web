'use client'

import { motion } from 'framer-motion'
import { Project } from './portfolioData'
import styles from './ProjectCard.module.css'

const categoryLabel: Record<string, string> = {
  web: '// web',
  webapp: '// aplicación web',
  automatizacion: '// automatización IA',
}

const categoryIcons: Record<string, string> = {
  web: '⬡',
  webapp: '◈',
  automatizacion: '◇',
}

interface Props {
  project: Project
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: Props) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className={styles.cardTop}>
        <div
          className={styles.cardGlow}
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${project.color}22, transparent 70%)`,
          }}
        />
        <span
          className={styles.cardIcon}
          style={{ color: project.color }}
        >
          {categoryIcons[project.category]}
        </span>
        {project.demo && (
          <span className={styles.demoBadge}>Demo interactiva</span>
        )}
      </div>

      <div className={styles.cardBody}>
        <span
          className={styles.cardCategory}
          style={{ color: project.color }}
        >
          {categoryLabel[project.category]}
        </span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <span
          className={styles.cardAction}
          style={{ color: project.color }}
        >
          {project.demo ? 'Probar demo' : 'Ver proyecto'}
          <span>→</span>
        </span>
      </div>
    </motion.div>
  )
}