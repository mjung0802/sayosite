import type { TabEntry } from '../../hooks/useTabs'
import { FILE_ICON_LABELS, FILE_ICON_COLORS } from '../../data/fileTree'
import styles from './Tab.module.css'

interface Props {
  tab: TabEntry
  isActive: boolean
  hasDot: boolean
  onActivate: () => void
  onClose: () => void
}

export default function Tab({ tab, isActive, hasDot, onActivate, onClose }: Props) {
  const iconColor = FILE_ICON_COLORS[tab.file.icon] || '#cccccc'
  const iconLabel = FILE_ICON_LABELS[tab.file.icon] || '📄'

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : styles.inactive}`}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      onClick={onActivate}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onActivate() }}
    >
      <span className={styles.icon} style={{ color: iconColor }}>{iconLabel}</span>
      <span className={styles.name}>{tab.file.name}</span>
      {hasDot && <span className={styles.dot} />}
      <button
        className={styles.closeBtn}
        onClick={e => { e.stopPropagation(); onClose() }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onClose() } }}
        title="Close"
        aria-label={`Close ${tab.file.name}`}
      >
        ×
      </button>
    </div>
  )
}
