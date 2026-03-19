import { useLocation } from 'react-router-dom'
import styles from './Breadcrumb.module.css'

function pathToBreadcrumb(pathname: string): string[] {
  if (pathname.startsWith('/projects/')) {
    const id = pathname.split('/').pop() || ''
    return ['src', 'projects', `${id}.tsx`]
  }
  const map: Record<string, string[]> = {
    '/about': ['src', 'about.md'],
    '/resume': ['src', 'resume.json'],
    '/hobbies': ['src', 'hobbies.css'],
    '/contact': ['contact.sh'],
  }
  return map[pathname] || ['src']
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const parts = pathToBreadcrumb(pathname)

  return (
    <div className={styles.breadcrumb}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className={styles.part}>
          {i > 0 && <span className={styles.sep}> › </span>}
          <span className={styles.text}>{part}</span>
        </span>
      ))}
    </div>
  )
}
