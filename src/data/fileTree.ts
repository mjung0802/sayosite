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

// Map route → file node (for tab system)
export const ROUTE_TO_FILE: Record<string, FileNode> = {
  '/about': FILE_TREE[0].children![0].children![0],
  '/resume': FILE_TREE[0].children![0].children![1],
  '/projects/project1': FILE_TREE[0].children![0].children![2].children![0],
  '/projects/project2': FILE_TREE[0].children![0].children![2].children![1],
  '/projects/project3': FILE_TREE[0].children![0].children![2].children![2],
  '/hobbies': FILE_TREE[0].children![0].children![3],
  '/contact': FILE_TREE[0].children![1],
}
