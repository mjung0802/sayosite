import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { contactContent } from '../../data/content'

function buildScript(): string {
  return `#!/bin/bash
# contact.sh — ways to get in touch with me

# ── Direct ──────────────────────────────────────────────────
EMAIL="${contactContent.email}"

# ── Online ──────────────────────────────────────────────────
GITHUB="${contactContent.github}"

# ── Send a message ──────────────────────────────────────────
# Use the terminal panel below to send a message directly.
# Type 'help' to get started.`
}

export default function Contact() {
  return <SyntaxHighlighter code={buildScript()} language="bash" />
}
