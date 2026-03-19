import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import FileTree from './FileTree'
import EditorArea from '../editor/EditorArea'
import TerminalPanel from '../terminal/TerminalPanel'
import StatusBar from './StatusBar'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const { cycleTheme, themeLabel } = useTheme()
  const [fileTreeVisible, setFileTreeVisible] = React.useState(true)

  return (
    <div className={styles.layout}>
      <TitleBar />
      <div className={styles.workbench}>
        <ActivityBar onToggleFileTree={() => setFileTreeVisible(v => !v)} />
        {fileTreeVisible && <FileTree />}
        <EditorArea />
      </div>
      <TerminalPanel />
      <StatusBar onCycleTheme={cycleTheme} themeLabel={themeLabel} />
    </div>
  )
}
