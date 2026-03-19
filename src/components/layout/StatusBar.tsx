import { useThemeContext } from '../../contexts/ThemeContext'
import styles from './StatusBar.module.css'

export default function StatusBar() {
  const { cycleTheme, themeLabel } = useThemeContext()
  return (
    <div className={styles.statusBar}>
      <div className={styles.left}>
        <span className={styles.item}>⎇ main</span>
        <span className={styles.item}>✓ 0 problems</span>
      </div>
      <div className={styles.right}>
        <span className={styles.item}>Ln 1, Col 1</span>
        <span className={styles.item}>UTF-8</span>
        <span className={styles.item}>TypeScript</span>
        <span className={`${styles.item} ${styles.clickable}`} onClick={cycleTheme}>{themeLabel}</span>
        <span className={styles.item}>🔔</span>
      </div>
    </div>
  )
}
