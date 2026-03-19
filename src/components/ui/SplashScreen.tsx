import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SplashScreen.module.css'

const FAKE_EXTENSIONS = [
  'Loading portfolio.code...',
  'Activating Extension: syntax-highlighter',
  'Activating Extension: file-tree-explorer',
  'Activating Extension: github-integration',
  'Activating Extension: terminal-panel',
  'Activating Extension: theme-manager',
  'Starting portfolio.code...',
]

const SPLASH_KEY = 'portfolio-splash-shown'

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    return !localStorage.getItem(SPLASH_KEY)
  })
  const [progress, setProgress] = useState(0)
  const [currentMsg, setCurrentMsg] = useState(FAKE_EXTENSIONS[0])

  useEffect(() => {
    if (!visible) return

    const totalDuration = 1800
    const steps = FAKE_EXTENSIONS.length
    const stepDuration = totalDuration / steps

    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(Math.min(100, (step / steps) * 100))
      setCurrentMsg(FAKE_EXTENSIONS[Math.min(step, FAKE_EXTENSIONS.length - 1)])

      if (step >= steps) {
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          localStorage.setItem(SPLASH_KEY, '1')
        }, 300)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.splash}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.content}>
            <div className={styles.logo}>
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                <rect x="15" y="5" width="20" height="90" rx="4" fill="#007acc"/>
                <rect x="45" y="25" width="20" height="70" rx="4" fill="#007acc"/>
                <rect x="75" y="45" width="20" height="50" rx="4" fill="#007acc"/>
              </svg>
            </div>
            <div className={styles.title}>portfolio.code</div>
            <div className={styles.message}>{currentMsg}</div>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
