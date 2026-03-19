import { useState, useRef } from 'react'
import styles from './IntelliSenseTooltip.module.css'

interface Definition {
  name: string
  type: string
  description: string
  source: string
}

interface Props {
  word: string
  definition: Definition
  children: React.ReactNode
}

export default function IntelliSenseTooltip({ definition, children }: Props) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const tooltipWidth = 340 // max-width from CSS
      const tooltipHeight = 80 // approximate height

      let x = rect.left
      let y = rect.bottom + 4

      // Keep within viewport
      if (x + tooltipWidth > window.innerWidth - 8) {
        x = window.innerWidth - tooltipWidth - 8
      }
      if (y + tooltipHeight > window.innerHeight - 8) {
        y = rect.top - tooltipHeight - 4 // show above instead
      }

      setPos({ x, y })
    }
    setVisible(true)
  }

  return (
    <>
      <span
        ref={ref}
        className={styles.trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {visible && (
        <div
          className={styles.tooltip}
          style={{ left: pos.x, top: pos.y }}
        >
          <div className={styles.signature}>
            <span className={styles.keyword}>const</span>
            {' '}
            <span className={styles.name}>{definition.name}</span>
            {': '}
            <span className={styles.type}>{definition.type}</span>
          </div>
          <div className={styles.description}>{definition.description}</div>
          <div className={styles.source}>@source {definition.source}</div>
        </div>
      )}
    </>
  )
}
