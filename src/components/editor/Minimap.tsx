import styles from './Minimap.module.css'

export default function Minimap() {
  return (
    <div className={styles.minimap} aria-hidden="true">
      <div className={styles.lines}>
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className={styles.line}
            style={{
              width: `${Math.random() * 60 + 20}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>
    </div>
  )
}
