import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { resumeContent } from '../../data/content'

export default function Resume() {
  const code = JSON.stringify(resumeContent, null, 2)
  return <SyntaxHighlighter code={code} language="json" />
}
