import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTabsContext } from '../../contexts/TabsContext'
import { ROUTE_TO_FILE } from '../../data/fileTree'
import styles from './CommandPalette.module.css'

interface PaletteItem {
  label: string
  description: string
  route: string
  icon: string
}

const ITEMS: PaletteItem[] = [
  { label: 'about.md', description: 'About Me', route: '/about', icon: '📝' },
  { label: 'resume.json', description: 'Resume & Experience', route: '/resume', icon: '{}' },
  { label: 'project1.tsx', description: 'DevFlow — developer productivity platform', route: '/projects/project1', icon: '⚛' },
  { label: 'project2.tsx', description: 'Synthwave — browser synthesizer', route: '/projects/project2', icon: '⚛' },
  { label: 'project3.tsx', description: 'Cartographer — collaborative maps', route: '/projects/project3', icon: '⚛' },
  { label: 'hobbies.css', description: 'Hobbies & Interests', route: '/hobbies', icon: '🎨' },
  { label: 'contact.sh', description: 'Contact — open terminal', route: '/contact', icon: '📬' },
]

function fuzzyMatch(query: string, text: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let qi = 0
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++
  }
  return qi === q.length
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const { openTab } = useTabsContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = ITEMS.filter(item =>
    fuzzyMatch(query, item.label) || fuzzyMatch(query, item.description)
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const navigate_to = useCallback((item: PaletteItem) => {
    const file = ROUTE_TO_FILE[item.route]
    if (file) openTab(file)
    else navigate(item.route)
    onClose()
  }, [openTab, navigate, onClose])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected(s => Math.min(s + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected(s => Math.max(s - 1, 0))
      } else if (e.key === 'Enter' && filtered[selected]) {
        navigate_to(filtered[selected])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, filtered, selected, navigate_to, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.palette}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.inputRow}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Go to file..."
                autoComplete="off"
              />
              <kbd className={styles.esc}>Esc</kbd>
            </div>
            <div className={styles.results}>
              {filtered.length === 0 && (
                <div className={styles.empty}>No results</div>
              )}
              {filtered.map((item, i) => (
                <div
                  key={item.route}
                  className={`${styles.item} ${i === selected ? styles.selected : ''}`}
                  onClick={() => navigate_to(item)}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <div className={styles.itemText}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemDesc}>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
