import styles from './EditorArea.module.css'

export default function EditorArea() {
  return (
    <div className={styles.editorArea}>
      <div className={styles.tabBar}>tabs here</div>
      <div className={styles.breadcrumb}>src &gt; about.md</div>
      <div className={styles.content}>
        <div className={styles.editor}>Editor content here</div>
        <div className={styles.minimap}>minimap</div>
      </div>
    </div>
  )
}
