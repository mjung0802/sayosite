import { useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { FileNode } from '../data/fileTree'
import { ROUTE_TO_FILE } from '../data/fileTree'

export interface TabEntry {
  id: string
  file: FileNode
  route: string
}

function routeToTab(route: string): TabEntry | null {
  // Normalise redirect routes
  const resolved = route === '/' ? '/about' : route
  const file = ROUTE_TO_FILE[resolved]
  if (!file || !file.route) return null
  return { id: file.id, file, route: file.route }
}

export function useTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const [tabs, setTabs] = useState<TabEntry[]>(() => {
    const initial = routeToTab(location.pathname)
    return initial ? [initial] : []
  })

  const activeRoute = location.pathname === '/' ? '/about' : location.pathname

  const openTab = useCallback((file: FileNode) => {
    if (!file.route) return
    setTabs(prev => {
      const exists = prev.find(t => t.id === file.id)
      if (exists) return prev
      return [...prev, { id: file.id, file, route: file.route! }]
    })
    navigate(file.route)
  }, [navigate])

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const idx = prev.findIndex(t => t.id === tabId)
      const next = prev.filter(t => t.id !== tabId)
      // Navigate if closing the active tab
      if (prev[idx]?.route === activeRoute) {
        const target = next.length > 0 ? next[Math.min(idx, next.length - 1)].route : '/about'
        // Schedule navigation after state update
        setTimeout(() => navigate(target), 0)
      }
      return next
    })
  }, [activeRoute, navigate])

  const activateTab = useCallback((tab: TabEntry) => {
    navigate(tab.route)
  }, [navigate])

  return { tabs, activeRoute, openTab, closeTab, activateTab }
}
