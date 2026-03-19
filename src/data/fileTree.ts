export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  route?: string
  icon: string        // emoji or icon identifier
  iconColor: string   // CSS color value
  children?: FileNode[]
}

export const FILE_TREE: FileNode[] = [
  {
    id: 'portfolio',
    name: 'PORTFOLIO',
    type: 'folder',
    icon: '📁',
    iconColor: '#dcb67a',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        icon: '📁',
        iconColor: '#dcb67a',
        children: [
          { id: 'about', name: 'about.md', type: 'file', route: '/about', icon: 'md', iconColor: '#519aba' },
          { id: 'resume', name: 'resume.json', type: 'file', route: '/resume', icon: 'json', iconColor: '#cbcb41' },
          {
            id: 'projects',
            name: 'projects',
            type: 'folder',
            icon: '📁',
            iconColor: '#dcb67a',
            children: [
              { id: 'project1', name: 'project1.tsx', type: 'file', route: '/projects/project1', icon: 'tsx', iconColor: '#519aba' },
              { id: 'project2', name: 'project2.tsx', type: 'file', route: '/projects/project2', icon: 'tsx', iconColor: '#519aba' },
              { id: 'project3', name: 'project3.tsx', type: 'file', route: '/projects/project3', icon: 'tsx', iconColor: '#519aba' },
            ],
          },
          { id: 'hobbies', name: 'hobbies.css', type: 'file', route: '/hobbies', icon: 'css', iconColor: '#519aba' },
        ],
      },
      { id: 'contact', name: 'contact.sh', type: 'file', route: '/contact', icon: 'sh', iconColor: '#4ec9b0' },
    ],
  },
]

export const FILE_ICON_LABELS: Record<string, string> = {
  md: '📝',
  json: '{}',
  tsx: '⚛',
  css: '🎨',
  sh: '📬',
}

export const FILE_ICON_COLORS: Record<string, string> = {
  md: '#519aba',
  json: '#cbcb41',
  tsx: '#519aba',
  css: '#42a5f5',
  sh: '#4ec9b0',
}

function buildRouteMap(nodes: FileNode[], acc: Record<string, FileNode> = {}): Record<string, FileNode> {
  for (const node of nodes) {
    if (node.route) acc[node.route] = node
    if (node.children) buildRouteMap(node.children, acc)
  }
  return acc
}

export const ROUTE_TO_FILE: Record<string, FileNode> = buildRouteMap(FILE_TREE)
