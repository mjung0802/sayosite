import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { aboutContent } from '../../data/content'

function buildMarkdown(): string {
  return `# ${aboutContent.fullName}
## ${aboutContent.role}

> ${aboutContent.location}

---

${aboutContent.bio}

---

## Contact

- **GitHub:** [${aboutContent.github}](${aboutContent.github})
- **Email:** [${aboutContent.email}](mailto:${aboutContent.email})
`
}

export default function About() {
  return <SyntaxHighlighter code={buildMarkdown()} language="markdown" />
}
