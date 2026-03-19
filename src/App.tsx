import { ThemeContext } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'
import AppLayout from './components/layout/AppLayout'

export default function App() {
  const themeValue = useTheme()
  return (
    <ThemeContext.Provider value={themeValue}>
      <AppLayout />
    </ThemeContext.Provider>
  )
}
