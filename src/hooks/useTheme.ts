import { useState, useEffect } from 'react'

export type Theme = 'theme-dark-plus' | 'theme-monokai' | 'theme-github-light'

const THEMES: Theme[] = ['theme-dark-plus', 'theme-monokai', 'theme-github-light']
const THEME_LABELS: Record<Theme, string> = {
  'theme-dark-plus': 'Dark+',
  'theme-monokai': 'Monokai',
  'theme-github-light': 'GitHub Light',
}

const STORAGE_KEY = 'vscode-portfolio-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Theme) || 'theme-dark-plus'
  })

  useEffect(() => {
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.startsWith('theme-'))
      .join(' ')
    document.body.classList.add(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme)
    setTheme(THEMES[(idx + 1) % THEMES.length])
  }

  return { theme, setTheme, cycleTheme, themeLabel: THEME_LABELS[theme] }
}
