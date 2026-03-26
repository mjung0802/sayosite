import { Highlight, themes } from 'prism-react-renderer'
import { useThemeContext } from '../../contexts/ThemeContext'
import styles from './SyntaxHighlighter.module.css'

function getLinkHref(raw: string): string | null {
  const s = raw.replace(/^["']|["']$/g, '')
  if (s.startsWith('https://') || s.startsWith('http://')) return s
  if (s.startsWith('mailto:')) return s
  if (s.startsWith('github.com/')) return `https://${s}`
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return `mailto:${s}`
  return null
}

// Map our theme names to prism-react-renderer themes
const PRISM_THEMES = {
  'theme-dark-plus': themes.vsDark,
  'theme-monokai': themes.dracula,
  'theme-github-light': themes.github,
}

interface Props {
  code: string
  language: string
  wordWrap?: boolean
}

export default function SyntaxHighlighter({ code, language, wordWrap }: Props) {
  const { theme } = useThemeContext()
  const prismTheme = PRISM_THEMES[theme] || themes.vsDark

  return (
    <Highlight theme={prismTheme} code={code.trim()} language={language as Parameters<typeof Highlight>[0]['language']}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.pre} editor-font`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className={styles.line}>
              <span className={styles.lineNumber}>{i + 1}</span>
              <span className={wordWrap ? styles.lineContentWrapped : styles.lineContent}>
                {line.map((token, key) => {
                  const href = getLinkHref(token.content)
                  return href
                    ? <a key={key} href={href} target="_blank" rel="noreferrer" className={styles.tokenLink}><span {...getTokenProps({ token })} /></a>
                    : <span key={key} {...getTokenProps({ token })} />
                })}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
