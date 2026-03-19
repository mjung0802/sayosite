import styles from './Minimap.module.css'

export default function Minimap() {
  return (
    <div className={styles.minimap}>
      {/* Minimap visual - will be enhanced later */}
      <div className={styles.overlay} />
    </div>
  )
}
