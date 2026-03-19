import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { resumeContent } from '../../data/content'
import IntelliSenseTooltip from '../ui/IntelliSenseTooltip'
import styles from './Resume.module.css'

export default function Resume() {
  const code = JSON.stringify(resumeContent, null, 2)
  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter code={code} language="json" />
      <div className={styles.annotations}>
        <div className={styles.annotationTitle}>// IntelliSense</div>
        {[
          {
            word: 'TypeScript',
            definition: {
              name: 'TypeScript',
              type: 'Language',
              description: 'Typed superset of JavaScript. Primary language for all projects.',
              source: 'skills',
            },
          },
          {
            word: 'React',
            definition: {
              name: 'React',
              type: 'Framework',
              description: 'UI library for building component-based interfaces.',
              source: 'skills',
            },
          },
          {
            word: 'PostgreSQL',
            definition: {
              name: 'PostgreSQL',
              type: 'Database',
              description: 'Primary relational database. Used in production systems.',
              source: 'skills',
            },
          },
        ].map(item => (
          <div key={item.word} className={styles.annotationItem}>
            <IntelliSenseTooltip word={item.word} definition={item.definition}>
              <span className={styles.token}>{item.word}</span>
            </IntelliSenseTooltip>
            <span className={styles.type}>{item.definition.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
