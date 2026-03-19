import type { TabEntry } from '../../hooks/useTabs'
import styles from './Tab.module.css'

const TAB_ICON_COLORS: Record<string, string> = {
  md: '#519aba',
  json: '#cbcb41',
  tsx: '#519aba',
  css: '#42a5f5',
  sh: '#4ec9b0',
}

const TAB_ICON_LABELS: Record<string, string> = {
  md: '📝',
  json: '{}',
  tsx: '⚛',
  css: '🎨',
  sh: '📬',
}

interface Props {
  tab: TabEntry
  isActive: boolean
  hasDot: boolean
  onActivate: () => void
  onClose: (e: React.MouseEvent) => void
}

export default function Tab({ tab, isActive, hasDot, onActivate, onClose }: Props) {
  const iconColor = TAB_ICON_COLORS[tab.file.icon] || '#cccccc'
  const iconLabel = TAB_ICON_LABELS[tab.file.icon] || '📄'

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : styles.inactive}`}
      onClick={onActivate}
    >
      <span className={styles.icon} style={{ color: iconColor }}>{iconLabel}</span>
      <span className={styles.name}>{tab.file.name}</span>
      {hasDot && <span className={styles.dot} />}
      <button
        className={styles.closeBtn}
        onClick={onClose}
        title="Close"
      >
        ×
      </button>
    </div>
  )
}
