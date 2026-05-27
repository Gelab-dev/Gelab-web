import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoAccent}>G</span>elab
        </Link>

        <span className={styles.copy}>
          © 2026 Gelab · Juan Cruz Gelabert
        </span>

        <div className={styles.links}>
          <Link href="/portfolio" className={styles.link}>Portfolio</Link>
          <a
            href="https://linkedin.com/company/gelab-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Gelab-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href="mailto:hola@gelab.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            hola@gelab.dev
          </a>
          <a href="https://gelab.dev" className={styles.link}>gelab.dev</a>
        </div>
      </footer>
    </>
  )
}