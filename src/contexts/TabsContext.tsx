import { createContext, useContext } from 'react'
import type { TabEntry } from '../hooks/useTabs'
import type { FileNode } from '../data/fileTree'

interface TabsContextValue {
  tabs: TabEntry[]
  activeRoute: string
  openTab: (file: FileNode) => void
  closeTab: (tabId: string) => void
  activateTab: (tab: TabEntry) => void
  terminalHasInput: boolean
  setTerminalHasInput: (v: boolean) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('useTabsContext must be used within TabsContext.Provider')
  return ctx
}
