import { createContext, useContext } from 'react'
import type { Theme } from '../hooks/useTheme'

interface ThemeContextValue {
  theme: Theme
  cycleTheme: () => void
  themeLabel: string
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'theme-dark-plus',
  cycleTheme: () => {},
  themeLabel: 'Dark+',
})

export function useThemeContext() {
  return useContext(ThemeContext)
}
