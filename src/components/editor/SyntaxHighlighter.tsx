import { Highlight, themes } from 'prism-react-renderer'
import { useThemeContext } from '../../contexts/ThemeContext'
import styles from './SyntaxHighlighter.module.css'

// Map our theme names to prism-react-renderer themes
const PRISM_THEMES = {
  'theme-dark-plus': themes.vsDark,
  'theme-monokai': themes.dracula,
  'theme-github-light': themes.github,
}

interface Props {
  code: string
  language: string
}

export default function SyntaxHighlighter({ code, language }: Props) {
  const { theme } = useThemeContext()
  const prismTheme = PRISM_THEMES[theme] || themes.vsDark

  return (
    <Highlight theme={prismTheme} code={code.trim()} language={language as Parameters<typeof Highlight>[0]['language']}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.pre} editor-font`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className={styles.line}>
              <span className={styles.lineNumber}>{i + 1}</span>
              <span className={styles.lineContent}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
