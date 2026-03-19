import { useState, useEffect } from 'react'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useTabsContext } from '../../contexts/TabsContext'
import { useGithubData } from '../../hooks/useGithubData'
import styles from './StatusBar.module.css'

export default function StatusBar() {
  const { cycleTheme, themeLabel } = useThemeContext()
  const { activeRoute, terminalHasInput } = useTabsContext()
  const { commitsThisWeek, isError, isLoading } = useGithubData()
  const [pulsing, setPulsing] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPulsing(false), 2000)
    return () => clearTimeout(t)
  }, [])

  // Derive language from active route
  function getLanguage(): string {
    if (activeRoute.startsWith('/projects/')) return 'TypeScript JSX'
    if (activeRoute === '/about') return 'Markdown'
    if (activeRoute === '/resume') return 'JSON'
    if (activeRoute === '/hobbies') return 'CSS'
    if (activeRoute === '/contact') return 'Shell Script'
    return 'TypeScript'
  }

  const commitsLabel = isLoading
    ? '↑ loading...'
    : isError
    ? '↑ —'
    : `↑ ${commitsThisWeek} commit${commitsThisWeek !== 1 ? 's' : ''} this week`

  return (
    <div className={styles.statusBar}>
      <div className={styles.left}>
        <span className={styles.item}>⎇ main</span>
        <span className={styles.item}>✓ 0 problems</span>
      </div>
      <div className={styles.right}>
        <span className={styles.item}>Ln 1, Col 1</span>
        <span className={styles.item}>UTF-8</span>
        <span className={styles.item}>{getLanguage()}</span>
        <span className={`${styles.item} ${pulsing ? styles.pulse : ''}`}>{commitsLabel}</span>
        <span className={`${styles.item} ${styles.clickable}`} onClick={cycleTheme}>{themeLabel}</span>
        <span className={`${styles.item} ${terminalHasInput ? styles.bellActive : ''}`}>🔔</span>
      </div>
    </div>
  )
}
