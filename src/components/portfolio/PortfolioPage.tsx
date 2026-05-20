'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects, Project, Category } from './portfolioData'
import styles from './Portfolio.module.css'

const filters: { label: string; value: Category | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Web', value: 'web' },
  { label: 'Aplicaciones', value: 'webapp' },
  { label: 'Automatización IA', value: 'automatizacion' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category | 'todos'>('todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = activeFilter === 'todos'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <>
        <div className={styles.page}>
        <Navbar />

        <div className={styles.hero}>
            <motion.span
            className={styles.tag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            {'// portfolio'}
            </motion.span>

            <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            >
            Trabajos que<br />
            <span className={styles.titleAccent}>hablan solos.</span>
            </motion.h1>

            <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            >
            Webs, automatizaciones e inteligencia artificial
            aplicada a negocios reales. Algunos tienen demo
            interactiva — probálos.
            </motion.p>
        </div>

        <div className={styles.filters}>
            {filters.map(f => (
            <button
                key={f.value}
                className={`${styles.filterBtn} ${
                activeFilter === f.value ? styles.filterBtnActive : ''
                }`}
                onClick={() => setActiveFilter(f.value)}
            >
                {f.label}
            </button>
            ))}
        </div>

        <div className={styles.grid}>
            {filtered.length === 0 ? (
                <div className={styles.empty}>
                {'// no hay proyectos en esta categoría todavía'}
                </div>
            ) : (
                filtered.map((project, i) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                />
                ))
            )}
        </div>

        <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>
            ¿Querés algo así para tu negocio?
            </h2>
            <p className={styles.ctaSub}>
            Hablemos 30 minutos. Sin compromiso, sin tecnicismos.
            </p>
            <a
            href="https://cal.com/gelab.dev/llamada-inicial"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            >
            {'Agendar una llamada →'}
            </a>
        </div>

        <Footer />

        {selectedProject && (
            <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            />
        )}
        </div>
    </>
  )
}