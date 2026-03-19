import React, { useState, useEffect } from 'react'
import { useThemeContext } from '../../contexts/ThemeContext'
import { TabsContext } from '../../contexts/TabsContext'
import { useTabs } from '../../hooks/useTabs'
import { ROUTE_TO_FILE } from '../../data/fileTree'
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import FileTree from './FileTree'
import EditorArea from '../editor/EditorArea'
import TerminalPanel from '../terminal/TerminalPanel'
import StatusBar from './StatusBar'
import CommandPalette from '../ui/CommandPalette'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  useThemeContext()
  const [fileTreeVisible, setFileTreeVisible] = React.useState(true)
  const tabsValue = useTabs()
  const [terminalHasInput, setTerminalHasInput] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Seed the about tab on first load if no tabs are open (e.g. navigating to '/')
  useEffect(() => {
    const { tabs, openTab } = tabsValue
    if (tabs.length === 0) {
      const aboutFile = ROUTE_TO_FILE['/about']
      if (aboutFile) openTab(aboutFile)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault()
        setPaletteOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

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
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </TabsContext.Provider>
  )
}
