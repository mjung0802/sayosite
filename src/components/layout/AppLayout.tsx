import React, { useState } from 'react'
import { useThemeContext } from '../../contexts/ThemeContext'
import { TabsContext } from '../../contexts/TabsContext'
import { useTabs } from '../../hooks/useTabs'
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import FileTree from './FileTree'
import EditorArea from '../editor/EditorArea'
import TerminalPanel from '../terminal/TerminalPanel'
import StatusBar from './StatusBar'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  useThemeContext()
  const [fileTreeVisible, setFileTreeVisible] = React.useState(true)
  const tabsValue = useTabs()
  const [terminalHasInput, setTerminalHasInput] = useState(false)

  return (
    <TabsContext.Provider value={{ ...tabsValue, terminalHasInput, setTerminalHasInput }}>
      <div className={styles.layout}>
        <TitleBar />
        <div className={styles.workbench}>
          <ActivityBar onToggleFileTree={() => setFileTreeVisible(v => !v)} />
          {fileTreeVisible && <FileTree />}
          <EditorArea />
        </div>
        <TerminalPanel />
        <StatusBar />
      </div>
    </TabsContext.Provider>
  )
}
