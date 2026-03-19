import { createContext, useContext } from 'react'
import type { TabEntry } from '../hooks/useTabs'
import type { FileNode } from '../data/fileTree'

interface TabsContextValue {
  tabs: TabEntry[]
  activeRoute: string
  openTab: (file: FileNode) => void
  closeTab: (tabId: string, event: React.MouseEvent) => void
  activateTab: (tab: TabEntry) => void
  terminalHasInput: boolean
  setTerminalHasInput: (v: boolean) => void
}

export const TabsContext = createContext<TabsContextValue>({
  tabs: [],
  activeRoute: '/about',
  openTab: () => {},
  closeTab: () => {},
  activateTab: () => {},
  terminalHasInput: false,
  setTerminalHasInput: () => {},
})

export function useTabsContext() {
  return useContext(TabsContext)
}
