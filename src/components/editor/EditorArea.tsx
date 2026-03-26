import TabBar from './TabBar'
import Breadcrumb from './Breadcrumb'
import EditorContent from './EditorContent'
import ImagePanel from './ImagePanel'
import styles from './EditorArea.module.css'

export default function EditorArea() {
  return (
    <div className={styles.editorArea}>
      <TabBar />
      <Breadcrumb />
      <div className={styles.body}>
        <EditorContent />
        <ImagePanel />
      </div>
    </div>
  )
}
