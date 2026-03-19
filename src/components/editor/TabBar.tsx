import { AnimatePresence, motion } from 'framer-motion'
import { useTabsContext } from '../../contexts/TabsContext'
import Tab from './Tab'
import styles from './TabBar.module.css'

export default function TabBar() {
  const { tabs, activeRoute, closeTab, activateTab, terminalHasInput } = useTabsContext()

  return (
    <div className={styles.tabBar}>
      <AnimatePresence initial={false}>
        {tabs.map(tab => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.12 }}
            style={{ display: 'flex' }}
          >
            <Tab
              tab={tab}
              isActive={tab.route === activeRoute}
              hasDot={tab.id === 'contact' && terminalHasInput}
              onActivate={() => activateTab(tab)}
              onClose={(e) => closeTab(tab.id, e)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
