import { useRef, useState, useCallback } from 'react'
import styles from './TerminalInput.module.css'

interface Props {
  onSubmit: (value: string) => void
  onHistoryNavigate: (direction: 'up' | 'down', current: string) => string
  disabled?: boolean
  placeholder?: string
}

export default function TerminalInput({ onSubmit, onHistoryNavigate, disabled, placeholder }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = value
      setValue('')
      onSubmit(v)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = onHistoryNavigate('up', value)
      setValue(prev)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = onHistoryNavigate('down', value)
      setValue(next)
    }
  }, [value, onSubmit, onHistoryNavigate])

  return (
    <div
      className={styles.inputRow}
      onClick={() => inputRef.current?.focus()}
    >
      <span className={styles.prompt}>$ </span>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  )
}
