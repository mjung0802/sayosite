import { useMemo } from 'react'
import styles from './Minimap.module.css'

export default function Minimap() {
  const lines = useMemo(() =>
    Array.from({ length: 80 }, () => ({
      width: `${Math.random() * 60 + 20}%`,
      opacity: Math.random() * 0.4 + 0.1,
    })),
    [] // empty deps = stable across re-renders
  )

  return (
    <div className={styles.minimap} aria-hidden="true">
      <div className={styles.lines}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={styles.line}
            style={{ width: line.width, opacity: line.opacity }}
          />
        ))}
      </div>
    </div>
  )
}
