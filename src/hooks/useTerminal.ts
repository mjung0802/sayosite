import { useState, useCallback } from 'react'

export type TerminalStep = 'idle' | 'name' | 'email' | 'message' | 'sending' | 'done' | 'error'

export interface TerminalLine {
  id: string
  type: 'output' | 'input' | 'prompt' | 'success' | 'error' | 'info'
  text: string
}

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

function mkLine(type: TerminalLine['type'], text: string): TerminalLine {
  return { id: crypto.randomUUID(), type, text }
}

interface ContactData {
  name: string
  email: string
  message: string
}

export function useTerminal(onInputChange: (hasInput: boolean) => void) {
  const [lines, setLines] = useState<TerminalLine[]>(() => [
    mkLine('output', "Welcome to DJ's terminal. Type 'help' to begin."),
    mkLine('output', ''),
  ])
  const [step, setStep] = useState<TerminalStep>('idle')
  const [contactData, setContactData] = useState<Partial<ContactData>>({})
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const append = useCallback((...newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines])
  }, [])

  const handleCommand = useCallback(async (input: string) => {
    const cmd = input.trim().toLowerCase()

    setHistory(prev => [input, ...prev].slice(0, 50))
    setHistoryIdx(-1)

    if (step === 'idle') {
      append(mkLine('input', `$ ${input}`))

      if (cmd === 'help') {
        append(
          mkLine('info', '  send-message    Compose a message'),
          mkLine('info', '  clear           Clear the terminal'),
          mkLine('info', '  whoami          About this machine'),
          mkLine('output', ''),
        )
      } else if (cmd === 'send-message') {
        append(mkLine('output', ''))
        append(mkLine('prompt', '  Enter your name: '))
        setStep('name')
        onInputChange(true)
      } else if (cmd === 'clear') {
        setLines([
          mkLine('output', "Welcome to DJ's terminal. Type 'help' to begin."),
          mkLine('output', ''),
        ])
        onInputChange(false)
      } else if (cmd === 'whoami') {
        append(
          mkLine('output', '  hostname: portfolio.code'),
          mkLine('output', '  user: visitor'),
          mkLine('output', '  uptime: since 2021'),
          mkLine('output', '  shell: /bin/portfolio'),
          mkLine('output', ''),
        )
      } else if (cmd === '') {
      } else {
        append(mkLine('error', `  command not found: ${input}`))
        append(mkLine('output', "  Type 'help' for available commands."))
        append(mkLine('output', ''))
      }
    } else if (step === 'name') {
      append(mkLine('input', input))
      if (!input.trim()) {
        append(mkLine('error', '  Name cannot be empty.'))
        append(mkLine('prompt', '  Enter your name: '))
      } else if (input.trim().length > 100) {
        append(mkLine('error', '  Name must be 100 characters or fewer.'))
        append(mkLine('prompt', '  Enter your name: '))
      } else {
        setContactData(prev => ({ ...prev, name: input.trim() }))
        append(mkLine('output', ''))
        append(mkLine('prompt', '  Enter your email: '))
        setStep('email')
      }
    } else if (step === 'email') {
      append(mkLine('input', input))
      if (input.trim().length > 254) {
        append(mkLine('error', '  Email address must be 254 characters or fewer.'))
        append(mkLine('prompt', '  Enter your email: '))
      } else if (!EMAIL_RE.test(input.trim())) {
        append(mkLine('error', '  Invalid email address.'))
        append(mkLine('prompt', '  Enter your email: '))
      } else {
        setContactData(prev => ({ ...prev, email: input.trim() }))
        append(mkLine('output', ''))
        append(mkLine('prompt', '  Enter your message: '))
        setStep('message')
      }
    } else if (step === 'message') {
      append(mkLine('input', input))
      if (!input.trim()) {
        append(mkLine('error', '  Message cannot be empty.'))
        append(mkLine('prompt', '  Enter your message: '))
      } else if (input.trim().length > 5000) {
        append(mkLine('error', '  Message must be 5000 characters or fewer.'))
        append(mkLine('prompt', '  Enter your message: '))
      } else {
        const finalData = { ...contactData, message: input.trim() } as ContactData
        append(mkLine('output', ''))
        append(mkLine('info', '  Sending...'))
        setStep('sending')

        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), 10000)
          )
          const res = await Promise.race([
            fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: finalData.name,
                email: finalData.email,
                message: finalData.message,
              }),
            }),
            timeoutPromise,
          ])
          if (res.status === 429) {
            append(
              mkLine('error', '  ✘ Too many requests. Please wait a few minutes before trying again.'),
              mkLine('output', ''),
            )
            setStep('idle')
            onInputChange(false)
            return
          }
          if (!res.ok) throw new Error(`Server error: ${res.status}`)
          append(
            mkLine('success', '  ✔ Message delivered.'),
            mkLine('success', `  ✔ Confirmation sent to ${finalData.email}`),
            mkLine('output', ''),
            mkLine('info', "  [ Press Enter to clear ]"),
          )
          setStep('done')
        } catch {
          append(
            mkLine('error', '  ✘ Failed to send message. Please try again.'),
            mkLine('output', ''),
          )
          setStep('idle')
          onInputChange(false)
        }
      }
    } else if (step === 'done') {
      setLines([
        mkLine('output', "Welcome to DJ's terminal. Type 'help' to begin."),
        mkLine('output', ''),
      ])
      setStep('idle')
      setContactData({})
      onInputChange(false)
    }
  }, [step, contactData, append, onInputChange])

  const navigateHistory = useCallback((direction: 'up' | 'down', currentInput: string): string => {
    if (history.length === 0) return currentInput
    const newIdx = direction === 'up'
      ? Math.min(historyIdx + 1, history.length - 1)
      : Math.max(historyIdx - 1, -1)
    setHistoryIdx(newIdx)
    return newIdx === -1 ? '' : history[newIdx]
  }, [history, historyIdx])

  return { lines, step, handleCommand, navigateHistory }
}
