import { useGithubData } from '../../hooks/useGithubData'
import styles from './TitleBar.module.css'

export default function TitleBar() {
  const { lastPushed } = useGithubData()

  return (
    <div className={styles.titleBar}>
      <div className={styles.trafficLights}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
      </div>
      <div className={styles.title}>
        <span className={styles.titleDot}>●</span>
        <span className={styles.titleText}>sayo.site</span>
        <span className={styles.subtitle}>— last pushed {lastPushed}</span>
      </div>
    </div>
  )
}
