export interface Experience {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
}

export interface Education {
  school: string
  degree: string
  year: string
}

export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  github?: string
  demo?: string
  highlights: string[]
}

export interface Hobby {
  name: string
  properties: Record<string, string>
}

export const aboutContent = {
  name: 'MJ',
  fullName: 'MJ Jung',
  role: 'Software Engineer',
  bio: `Hi, I'm MJ — a software engineer who loves building things that live at the intersection of great UX and solid engineering.

I specialize in full-stack web development with a focus on TypeScript, React, and Node.js. I care about writing clean, maintainable code and shipping products that people actually enjoy using.

When I'm not coding, you'll find me exploring new coffee spots, tinkering with side projects, or getting lost in a good book.`,
  location: 'San Francisco, CA',
  email: 'mjung0802@gmail.com',
  github: 'https://github.com/mjung0802',
  photo: null,
}

export const resumeContent = {
  name: 'MJ Jung',
  title: 'Software Engineer',
  contact: {
    email: 'mjung0802@gmail.com',
    github: 'github.com/mjung0802',
    location: 'San Francisco, CA',
  },
  experience: [
    {
      company: 'TechCorp',
      role: 'Software Engineer',
      period: '2023 – Present',
      description: 'Building scalable web applications and internal developer tools',
      tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      company: 'StartupXYZ',
      role: 'Frontend Developer',
      period: '2021 – 2023',
      description: 'Led frontend development for a B2B SaaS platform',
      tech: ['React', 'Redux', 'GraphQL', 'Tailwind CSS'],
    },
  ] as Experience[],
  skills: [
    'TypeScript', 'JavaScript', 'React', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker',
    'Git', 'REST APIs', 'GraphQL', 'Testing',
  ],
  education: [
    {
      school: 'University of California',
      degree: 'B.S. Computer Science',
      year: '2021',
    },
  ] as Education[],
}

export const projectsContent: Record<string, Project> = {
  project1: {
    id: 'project1',
    name: 'DevFlow',
    description: 'A developer productivity platform that integrates GitHub, Linear, and Slack into a unified workflow dashboard',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GitHub API'],
    github: 'github.com/mjung0802/devflow',
    demo: 'devflow.demo.com',
    highlights: [
      'Real-time sync with GitHub webhooks',
      'Automated issue triage using ML classification',
      'Custom dashboard with drag-and-drop widgets',
    ],
  },
  project2: {
    id: 'project2',
    name: 'Synthwave',
    description: 'A browser-based synthesizer and music sequencer built entirely with the Web Audio API',
    stack: ['TypeScript', 'Web Audio API', 'Canvas API', 'Vite'],
    github: 'github.com/mjung0802/synthwave',
    demo: 'synthwave.demo.com',
    highlights: [
      '8-track step sequencer with swing quantization',
      'Custom oscillator with envelope controls (ADSR)',
      'Export to WAV using AudioContext recording',
    ],
  },
  project3: {
    id: 'project3',
    name: 'Cartographer',
    description: 'A collaborative map annotation tool for teams to mark, share, and discuss locations in real-time',
    stack: ['React', 'TypeScript', 'Mapbox GL', 'Socket.io', 'Redis'],
    github: 'github.com/mjung0802/cartographer',
    highlights: [
      'Real-time collaboration via WebSockets',
      'Custom map layers with GeoJSON overlays',
      'Offline-first with service worker caching',
    ],
  },
}

export const hobbiesContent: Hobby[] = [
  {
    name: 'photography',
    properties: {
      frequency: 'weekends',
      gear: '"Sony A7IV"',
      style: '"street + golden-hour"',
      'favorite-lens': '"35mm f/1.8"',
    },
  },
  {
    name: 'coffee',
    properties: {
      method: '"pour-over"',
      beans: '"single-origin"',
      grinder: '"Comandante C40"',
      addiction: 'true',
    },
  },
  {
    name: 'reading',
    properties: {
      genres: '"sci-fi, systems-thinking"',
      'books-per-year': '12',
      'current-read': '"The Three-Body Problem"',
      format: '"kindle + physical"',
    },
  },
  {
    name: 'running',
    properties: {
      distance: '"5k to half-marathon"',
      pace: '"comfortable"',
      'favorite-route': '"golden-gate-park"',
      shoes: '"Nike Pegasus"',
    },
  },
]
