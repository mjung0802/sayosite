import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useTabsContext } from '../../contexts/TabsContext'
import { SECTION_IMAGES } from '../../data/images'
import styles from './ImagePanel.module.css'

export default function ImagePanel() {
  const { activeRoute } = useTabsContext()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  // Reset failed images when section changes
  useEffect(() => {
    setFailedImages(new Set())
    setSelectedId(null)
  }, [activeRoute])

  // Escape key dismissal
  useEffect(() => {
    if (!selectedId) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId])

  const handleError = useCallback((name: string) => {
    setFailedImages(prev => new Set(prev).add(name))
  }, [])

  const imageNames = SECTION_IMAGES[activeRoute] ?? []
  const visibleNames = imageNames.filter(name => !failedImages.has(name))

  if (visibleNames.length === 0 && imageNames.length > 0) {
    // All images failed — wait for errors to propagate, panel hides itself
  }

  if (imageNames.length === 0) return null

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoute}
          className={styles.panel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {imageNames.map(name => (
            <motion.img
              key={name}
              layoutId={`img-${name}`}
              className={styles.thumbnail}
              src={`/images/${name}.png`}
              alt={name}
              onError={() => handleError(name)}
              onClick={() => setSelectedId(name)}
              style={{ display: failedImages.has(name) ? 'none' : 'block' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {createPortal(
        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedId(null)}
              />
              <div className={styles.lightboxWrapper}>
                <motion.img
                  layoutId={`img-${selectedId}`}
                  className={styles.lightboxImage}
                  src={`/images/${selectedId}.png`}
                  alt={selectedId}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </LayoutGroup>
  )
}
