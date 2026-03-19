import { useState } from 'react'
import styles from './ActivityBar.module.css'

interface Props {
  onToggleFileTree: () => void
}

const explorerIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 0h-9L7 1.5v3H3.5L2 6v16.5L3.5 24h13l1.5-1.5v-3H21l1.5-1.5V6l-5-6zm0 20.5V23h-13V6h3.5v11l1.5 1.5h8v3zM21 18h-8V1.5l5 5V18z"/>
  </svg>
)

const searchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1.12 8.06-8.06A8.25 8.25 0 1 0 15.25 0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"/>
  </svg>
)

const extensionsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 2a3.5 3.5 0 0 1 3.268 4.745L20.5 9.5l-6 6-2.755-2.732A3.5 3.5 0 0 1 7.268 9H4L0 5l3-3h1a3.5 3.5 0 0 1 3.268 2.268A3.5 3.5 0 0 1 14.5 2z"/>
  </svg>
)

export default function ActivityBar({ onToggleFileTree }: Props) {
  const [active, setActive] = useState<string>('explorer')

  const handleExplorer = () => {
    setActive('explorer')
    onToggleFileTree()
  }

  return (
    <div className={styles.activityBar}>
      <div className={styles.topIcons}>
        <button
          className={`${styles.iconBtn} ${active === 'explorer' ? styles.active : ''}`}
          onClick={handleExplorer}
          title="Explorer"
          aria-label="Explorer"
        >
          {explorerIcon}
        </button>
        <button
          className={`${styles.iconBtn} ${active === 'search' ? styles.active : ''}`}
          onClick={() => setActive('search')}
          title="Search"
          aria-label="Search"
        >
          {searchIcon}
        </button>
        <button
          className={`${styles.iconBtn} ${active === 'extensions' ? styles.active : ''}`}
          onClick={() => setActive('extensions')}
          title="Extensions"
          aria-label="Extensions"
        >
          {extensionsIcon}
        </button>
      </div>
    </div>
  )
}
