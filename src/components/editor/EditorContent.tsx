import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import EditorErrorBoundary from './EditorErrorBoundary'
import styles from './EditorContent.module.css'

const About = lazy(() => import('../sections/About'))
const Resume = lazy(() => import('../sections/Resume'))
const Project = lazy(() => import('../sections/Project'))
const Hobbies = lazy(() => import('../sections/Hobbies'))
const Contact = lazy(() => import('../sections/Contact'))

export default function EditorContent() {
  return (
    <div className={styles.content}>
      <EditorErrorBoundary>
        <Suspense fallback={<div style={{ padding: 16, opacity: 0.5, fontFamily: 'monospace' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </EditorErrorBoundary>
    </div>
  )
}
