import { Routes, Route, Navigate } from 'react-router-dom'
import About from '../components/sections/About'
import Resume from '../components/sections/Resume'
import Project from '../components/sections/Project'
import Hobbies from '../components/sections/Hobbies'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/contact" element={<Navigate to="/about" replace />} />
    </Routes>
  )
}
