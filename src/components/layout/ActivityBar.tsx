import styles from './ActivityBar.module.css'

interface Props {
  onToggleFileTree: () => void
}

export default function ActivityBar({ onToggleFileTree }: Props) {
  return (
    <div className={styles.activityBar}>
      <button className={styles.iconBtn} onClick={onToggleFileTree} title="Explorer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 0h-9L7 1.5v3H3.5L2 6v16.5L3.5 24h13l1.5-1.5v-3H21l1.5-1.5V6l-5-6zm0 20.5V23h-13V6h3.5v11l1.5 1.5h8v3zM21 18h-8V1.5l5 5V18z"/>
        </svg>
      </button>
      <button className={styles.iconBtn} title="Search">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1.12 8.06-8.06A8.25 8.25 0 1 0 15.25 0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"/>
        </svg>
      </button>
      <button className={styles.iconBtn} title="Extensions">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 1.5a1.5 1.5 0 0 0-3 0v1H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4.5a2 2 0 0 0-2-2h-1.5v-1a1.5 1.5 0 0 0-3 0v1h-7v-1z"/>
        </svg>
      </button>
    </div>
  )
}
