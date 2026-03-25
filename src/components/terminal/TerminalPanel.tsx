import { useRef, useCallback, useState } from 'react'
import { useTabsContext } from '../../contexts/TabsContext'
import { useGithubData } from '../../hooks/useGithubData'
import { useTerminal } from '../../hooks/useTerminal'
import GithubHeatmap from './GithubHeatmap'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import styles from './TerminalPanel.module.css'

const MIN_HEIGHT = 120
const MAX_HEIGHT = 600
const DEFAULT_HEIGHT = 220

export default function TerminalPanel() {
  const { setTerminalHasInput } = useTabsContext()
  const { heatmapData, isError } = useGithubData()

  const { lines, step, handleCommand, navigateHistory } = useTerminal(setTerminalHasInput)

  const [collapsed, setCollapsed] = useState(false)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startHeight = useRef(DEFAULT_HEIGHT)

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    startY.current = e.clientY
    startHeight.current = height

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      const delta = startY.current - ev.clientY
      const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, startHeight.current + delta))
      setHeight(newHeight)
      document.documentElement.style.setProperty('--terminal-height', `${newHeight}px`)
    }

    const onUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [height])

  if (collapsed) {
    return (
      <div className={styles.collapsed}>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(false)}
          title="Expand terminal"
        >
          TERMINAL ▲
        </button>
      </div>
    )
  }

  return (
    <div className={styles.terminal} style={{ height }}>
      {/* Resize handle */}
      <div className={styles.resizeHandle} onMouseDown={onDragStart} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>TERMINAL</span>
        <span className={styles.username}>github/mjung0802</span>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(true)}
          title="Collapse terminal"
        >
          ▾
        </button>
      </div>

      {/* Heatmap overlaid on terminal body, absolutely positioned */}
      <div className={styles.heatmapOverlay}>
        <GithubHeatmap cells={heatmapData} isError={isError} />
      </div>

      {/* Text area — restricted horizontally via padding-right */}
      <div className={styles.terminalBody}>
        <TerminalOutput lines={lines} />
        <TerminalInput
          onSubmit={handleCommand}
          onHistoryNavigate={navigateHistory}
          disabled={step === 'sending'}
        />
      </div>
    </div>
  )
}
