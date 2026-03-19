import { useEffect, useRef } from 'react'
import type { TerminalLine } from '../../hooks/useTerminal'
import styles from './TerminalOutput.module.css'

interface Props {
  lines: TerminalLine[]
}

const LINE_COLORS: Record<TerminalLine['type'], string> = {
  output: 'var(--vscode-terminal-foreground)',
  input: 'var(--syntax-variable)',
  prompt: 'var(--syntax-string)',
  success: 'var(--syntax-comment)',
  error: '#f48771',
  info: 'var(--syntax-type)',
}

export default function TerminalOutput({ lines }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div className={styles.output}>
      {lines.map(line => (
        <div
          key={line.id}
          className={styles.line}
          style={{ color: LINE_COLORS[line.type] }}
        >
          {line.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
