import { useState } from 'react'
import { useTabsContext } from '../../contexts/TabsContext'
import { FILE_TREE } from '../../data/fileTree'
import type { FileNode } from '../../data/fileTree'
import styles from './FileTree.module.css'

const FILE_ICONS: Record<string, string> = {
  md: '📝',
  json: '{}',
  tsx: '⚛',
  css: '🎨',
  sh: '📬',
}

const ICON_COLORS: Record<string, string> = {
  md: '#519aba',
  json: '#cbcb41',
  tsx: '#519aba',
  css: '#42a5f5',
  sh: '#4ec9b0',
}

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
          onClick={() => setExpanded(e => !e)}
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
      onClick={() => openTab(node)}
    >
      <span
        className={styles.fileIcon}
        style={{ color: ICON_COLORS[node.icon] || '#cccccc' }}
      >
        {FILE_ICONS[node.icon] || '📄'}
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
