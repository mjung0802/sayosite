import styles from './TerminalPanel.module.css'

export default function TerminalPanel() {
  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <span className={styles.title}>TERMINAL</span>
      </div>
      <div className={styles.body}>
        <div className={styles.output}>Terminal panel coming soon...</div>
        <div className={styles.inputRow}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.cursor}>_</span>
        </div>
      </div>
    </div>
  )
}
