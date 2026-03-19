import { Routes, Route, Navigate } from 'react-router-dom'
import About from '../sections/About'
import Resume from '../sections/Resume'
import Project from '../sections/Project'
import Hobbies from '../sections/Hobbies'
import styles from './EditorContent.module.css'

export default function EditorContent() {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/contact" element={<div />} />
      </Routes>
    </div>
  )
}
