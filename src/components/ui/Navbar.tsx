'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
          <Link href="/" className={styles.logoLink}><span className={styles.logoAccent}>G</span>elab</Link>
        </div>

        {/* Desktop links */}
        <div className={styles.links}>
          <Link href="/#servicios"   className={styles.link}>Servicios</Link>
          <Link href="/#como-funciona"   className={styles.link}>Cómo funciona</Link>
          <Link href="/#proceso"     className={styles.link}>Proceso</Link>
          <Link href="/#tecnologia"  className={styles.link}>Tecnología</Link>
          <Link href="/portfolio"    className={styles.link}>Portfolio</Link>
          <Link href="/#contacto"    className={styles.link}>Contacto</Link>
          <Link href="/#contacto"    className={styles.cta}>{'Hablemos →'}</Link>
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
          <Link href="/"            className={styles.mobileLink} onClick={closeMenu}>Inicio</Link>
          <Link href="/#servicios"  className={styles.mobileLink} onClick={closeMenu}>Servicios</Link>
          <Link href="/#como-funciona"  className={styles.mobileLink} onClick={closeMenu}>Cómo funciona</Link>
          <Link href="/#proceso"    className={styles.mobileLink} onClick={closeMenu}>Proceso</Link>
          <Link href="/#tecnologia" className={styles.mobileLink} onClick={closeMenu}>Tecnología</Link>
          <Link href="/portfolio"   className={styles.mobileLink} onClick={closeMenu}>Portfolio</Link>
          <Link href="/#contacto"   className={styles.mobileLink} onClick={closeMenu}>Contacto</Link>
          <Link href="/#contacto"   className={styles.mobileCta}  onClick={closeMenu}>{'Hablemos →'}</Link>
        </div>
      )}
    </>
  )
}