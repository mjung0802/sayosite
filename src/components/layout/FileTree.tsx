import { useState } from 'react'
import { useTabsContext } from '../../contexts/TabsContext'
import { FILE_TREE, FILE_ICON_LABELS, FILE_ICON_COLORS } from '../../data/fileTree'
import type { FileNode } from '../../data/fileTree'
import styles from './FileTree.module.css'

interface FileTreeNodeProps {
  node: FileNode
  depth: number
}

function FileTreeNode({ node, depth }: FileTreeNodeProps) {
  const { openTab, activeRoute } = useTabsContext()
  const [expanded, setExpanded] = useState(true)

  const isActive = node.route === activeRoute

  if (node.type === 'folder') {
    return (
      <div>
        <div
          className={styles.folderRow}
          style={{ paddingLeft: depth * 12 + 8 }}
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(e => !e)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(v => !v) }}
        >
          <span className={styles.arrow}>{expanded ? '▾' : '▸'}</span>
          <span className={styles.folderIcon}>📁</span>
          <span className={styles.name}>{node.name}</span>
        </div>
        {expanded && node.children?.map(child => (
          <FileTreeNode key={child.id} node={child} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${styles.fileRow} ${isActive ? styles.active : ''}`}
      style={{ paddingLeft: depth * 12 + 8 }}
      role="button"
      tabIndex={0}
      onClick={() => openTab(node)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openTab(node) }}
    >
      <span
        className={styles.fileIcon}
        style={{ color: FILE_ICON_COLORS[node.icon] || '#cccccc' }}
      >
        {FILE_ICON_LABELS[node.icon] || '📄'}
      </span>
      <span className={styles.name}>{node.name}</span>
    </div>
  )
}

export default function FileTree() {
  return (
    <div className={styles.fileTree}>
      <div className={styles.header}>EXPLORER</div>
      {FILE_TREE.map(node => (
        <FileTreeNode key={node.id} node={node} depth={0} />
      ))}
    </div>
  )
}
