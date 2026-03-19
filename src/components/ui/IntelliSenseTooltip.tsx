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
      setPos({ x: rect.left, y: rect.bottom + 4 })
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
