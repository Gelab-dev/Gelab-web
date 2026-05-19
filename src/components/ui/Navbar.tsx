'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const navClass = scrolled
    ? `${styles.nav} ${styles.navScrolled}`
    : styles.nav

  return (
    <>
      <nav className={navClass}>
        <div className={styles.logo}>
          <a href="#inicio" className={styles.logoLink}><span className={styles.logoAccent}>G</span>elab</a>
        </div>

        {/* Desktop links */}
        <div className={styles.links}>
          <a href="#servicios" className={styles.link}>Servicios</a>
          <a href="#proceso" className={styles.link}>Proceso</a>
          <a href="#tecnologia" className={styles.link}>Tecnología</a>
          <a href="#contacto" className={styles.link}>Contacto</a>
          <a href="#contacto" className={styles.cta}>{'Hablemos →'}</a>
        </div>
      </nav>

      {/* Botón hamburguesa — siempre encima de todo */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.line1Open : ''}`} />
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.line2Open : ''}`} />
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.line3Open : ''}`} />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#servicios" className={styles.mobileLink} onClick={closeMenu}>Servicios</a>
          <a href="#proceso" className={styles.mobileLink} onClick={closeMenu}>Proceso</a>
          <a href="#tecnologia" className={styles.mobileLink} onClick={closeMenu}>Tecnología</a>
          <a href="#contacto" className={styles.mobileLink} onClick={closeMenu}>Contacto</a>
          <a href="#contacto" className={styles.mobileCta} onClick={closeMenu}>{'Hablemos →'}</a>
        </div>
      )}
    </>
  )
}