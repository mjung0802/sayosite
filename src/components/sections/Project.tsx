import { useParams } from 'react-router-dom'
import SyntaxHighlighter from '../editor/SyntaxHighlighter'
import { projectsContent } from '../../data/content'

function buildTsx(id: string): string {
  const p = projectsContent[id]
  if (!p) return `// Project not found: ${id}`

  const stackImports = p.stack
    .map(dep => {
      const pkg = dep.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const identifier = dep.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
      return `import { ${identifier} } from '${pkg}'`
    })
    .join('\n')

  const highlights = p.highlights
    .map(h => ` *   - ${h}`)
    .join('\n')

  return `${stackImports}

/**
 * @project  ${p.name}
 * @description ${p.description}
 *
 * @highlights
${highlights}
 *${p.github ? `\n * @link     https://${p.github}` : ''}${p.demo ? `\n * @demo     ${p.demo}` : ''}
 */

export default function ${p.name.replace(/\s+/g, '')}({ id, title, description, stack, links }: ${p.name.replace(/\s+/g, '')}Props) {
${p.github && !p.github.includes(' ') ? `  const GITHUB_URL = "https://${p.github}"\n` : ''}${p.demo && p.demo.startsWith('https://') ? `  const DEMO_URL = "${p.demo}"\n` : ''}  return (
    <ProjectCard
      id={id}
      title={title}
      description={description}
      stack={stack}
      links={links}
    />
  )
}
`
}

export default function Project() {
  const { id } = useParams<{ id: string }>()
  const code = buildTsx(id ?? 'project1')
  return <SyntaxHighlighter code={code} language="tsx" />
}
