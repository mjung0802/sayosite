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
 * @stack    ${p.stack.join(', ')}
 *
 * @highlights
${highlights}
 *${p.github ? `\n * @link     https://${p.github}` : ''}${p.demo ? `\n * @demo     https://${p.demo}` : ''}
 */

interface ${p.name}Props {
  id: string
  title: string
  description: string
  stack: string[]
  links: {
    github?: string
    demo?: string
  }
}

export default function ${p.name}({ id, title, description, stack, links }: ${p.name}Props) {
  return (
    <ProjectCard
      id={id}
      title={title}
      description={description}
      stack={stack}
      links={links}
    />
  )
}

// Usage:
// <${p.name}
//   id="${p.id}"
//   title="${p.name}"
//   description="${p.description}"
//   stack={[${p.stack.map(s => `"${s}"`).join(', ')}]}
//   links={{ ${p.github ? `github: "https://${p.github}"` : ''}${p.demo ? `, demo: "https://${p.demo}"` : ''} }}
// />
`
}

export default function Project() {
  const { id } = useParams<{ id: string }>()
  const code = buildTsx(id ?? 'project1')
  return <SyntaxHighlighter code={code} language="tsx" />
}
