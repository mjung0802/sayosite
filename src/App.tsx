import { ThemeContext } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'
import AppLayout from './components/layout/AppLayout'
import SplashScreen from './components/ui/SplashScreen'

export default function App() {
  const themeValue = useTheme()
  return (
    <ThemeContext.Provider value={themeValue}>
      <SplashScreen />
      <AppLayout />
    </ThemeContext.Provider>
  )
}
