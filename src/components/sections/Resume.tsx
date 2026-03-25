import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { resumeContent } from '../../data/content'
import IntelliSenseTooltip from '../ui/IntelliSenseTooltip'
import styles from './Resume.module.css'

export default function Resume() {
  const code = JSON.stringify(resumeContent, null, 2)
  return (
    <div className={styles.splitContainer}>
      {/* Left pane: JSON source */}
      <div className={`${styles.pane} ${styles.jsonPane}`}>
        <div className={styles.paneHeader}>
          <span className={styles.paneIcon} style={{ color: '#cbcb41' }}>&#x7b;&#x7d;</span>
          <span className={styles.paneLabel}>resume.json</span>
        </div>
        <div className={`${styles.paneContent} ${styles.jsonContent}`}>
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
                word: 'Node.js',
                definition: {
                  name: 'Node.js',
                  type: 'Runtime',
                  description: 'JavaScript runtime for server-side and backend services.',
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
      </div>

      {/* Right pane: PDF preview */}
      <div className={`${styles.pane} ${styles.pdfPane}`}>
        <div className={styles.paneHeader}>
          <span className={styles.paneIcon} style={{ color: '#8b8b8b' }}>&#x1f4c4;</span>
          <span className={styles.paneLabel}>resume.pdf</span>
          <span className={styles.paneSubLabel}>· compiled</span>
        </div>
        <div className={`${styles.paneContent} ${styles.pdfContent}`}>
          <iframe
            src="/Resume.pdf"
            className={styles.pdfFrame}
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  )
}
