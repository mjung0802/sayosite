import styles from './TitleBar.module.css'

export default function TitleBar() {
  return (
    <div className={styles.titleBar}>
      <div className={styles.trafficLights}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
      </div>
      <div className={styles.title}>
        <span className={styles.titleText}>portfolio.code</span>
        <span className={styles.subtitle}>— last pushed recently</span>
      </div>
    </div>
  )
}
