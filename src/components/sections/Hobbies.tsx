import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { hobbiesContent } from '../../data/content'

function buildCss(): string {
  const blocks = hobbiesContent.map(hobby => {
    const props = Object.entries(hobby.properties)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n')
    return `.${hobby.name} {\n${props}\n}`
  })
  return `/* hobbies.css — things I do when not coding */\n\n` + blocks.join('\n\n')
}

export default function Hobbies() {
  return <SyntaxHighlighter code={buildCss()} language="css" />
}
