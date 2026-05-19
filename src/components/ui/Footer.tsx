import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <span className={styles.logoAccent}>G</span>elab
      </div>

      <span className={styles.copy}>
        © 2025 Gelab · Juan Cruz Gelabert
      </span>

      <div className={styles.links}>
        <a
          href="https://www.linkedin.com/company/gelab-dev"
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
          href="https://gelab.dev"
          className={styles.link}
        >
          gelab.dev
        </a>
      </div>
    </footer>
  )
}