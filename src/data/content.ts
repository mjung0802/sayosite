export interface Experience {
  company: string
  location: string
  role: string
  period: string
  highlights: string[]
  tech: string[]
}

export interface Education {
  school: string
  location: string
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

export const contactContent = {
  email: 'daniel0802@gmail.com',
  github: 'https://github.com/mjung0802',
}

export const aboutContent = {
  name: 'Daniel',
  fullName: 'Daniel Jung',
  role: 'Software Engineer',
  bio: `Hi, I'm Daniel (also known as sayo) - a software engineer who loves building interesting projects at the intersection of great UX and solid engineering.

I specialize in full-stack web development using TypeScript (Node.js/React), but I'm flexible with languages and frameworks and always eager to learn new ones. I care about writing clean, maintainable code and shipping products that people actually enjoy using.

When I'm not coding, you'll find me cooking for my family, playing games with my fiancée, or hosting events for my community.`,
  location: 'Chandler, AZ',
  email: 'daniel0802@gmail.com',
  github: 'https://github.com/mjung0802',
  photo: null,
}

export const resumeContent = {
  name: 'Daniel M Jung',
  title: 'Full-Stack Software Engineer',
  contact: {
    email: 'daniel0802@gmail.com',
    phone: '480-433-6697',
    location: 'Chandler, AZ',
    github: 'github.com/mjung0802',
  },
  summary: 'Full-stack engineer with 6+ years of experience building scalable web and mobile applications across enterprise, SaaS, and early-stage startup environments. Specializes in AI-powered product development, behavior-driven test automation, and end-to-end ownership.',
  skills: {
    'Back-End': ['Node.js', 'Java/Spring', 'Python'],
    'Front-End': ['JavaScript/TypeScript', 'React/React Native', 'Angular'],
    'Databases': ['MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB'],
    'Testing': ['Selenium', 'Jest', 'Cypress', 'Cucumber'],
    'API': ['REST', 'SOAP', 'Microservices', 'Event-Driven'],
    'Cloud & DevOps': ['AWS', 'Vercel', 'Jenkins', 'GitHub Actions'],
  },
  experience: [
    {
      company: 'TBD Labs, an AI stealth startup',
      location: 'Charlotte, NC',
      role: 'Software Engineer',
      period: 'Apr 2023 - Jan 2026',
      highlights: [
        'Designed and shipped an AI-powered app builder converting business requirements into React Native web/mobile apps, improving operational efficiency by 20%',
        'Drove new customer acquisitions by 3x through tailored AI consulting engagements',
        'Owned the full product lifecycle — client discovery, system architecture, UI design system, implementation, and automated behavior-driven testing suite',
      ],
      tech: ['Node.js/Python', 'TypeScript/React Native', 'AWS/Vercel', 'Selenium/Storybook', 'REST', 'GitHub Actions'],
    },
    {
      company: 'MessageGears',
      location: 'Atlanta, GA',
      role: 'Software Engineer',
      period: 'Oct 2021 - Sept 2022',
      highlights: [
        'Built personalization features for an enterprise marketing SaaS, increasing client engagement metrics by 120%',
        'Led front-end modernization migrating legacy JSP to Angular 9, cutting production error rates by 80%',
        'Delivered technical product demos to enterprise clients; feedback directly shaped the product roadmap',
        'Mentored interns and coordinated cross-functional sprint planning',
      ],
      tech: ['Java/Node.js', 'TypeScript/Angular', 'AWS', 'Selenium/Cypress/Jest', 'REST', 'Jenkins/GitHub Actions'],
    },
    {
      company: 'Itential',
      location: 'Atlanta, GA',
      role: 'Lead Software Developer',
      period: 'Sept 2020 - Sept 2021',
      highlights: [
        'Led an engineering team building network automation solutions supporting the nationwide 5G infrastructure rollout',
        'Architected a proprietary automated testing framework eliminating the need for a 40-person technical support team',
        'Doubled operational efficiency by surfacing real-time production insights for non-technical teams',
      ],
      tech: ['Node.js/Java', 'TypeScript/Angular', 'MongoDB', 'Selenium/Jest', 'REST/SOAP', 'Jenkins/GitHub Actions'],
    },
    {
      company: 'Ford Motor Company',
      location: 'Dearborn, MI',
      role: 'Software Developer',
      period: 'Sept 2019 - Sept 2020',
      highlights: [
        'Streamlined order intake via cloud-native microservices, saving an estimated $20M annually',
        'Piloted an Agile pair/mob programming initiative, improving cross-team knowledge transfer',
        'Expanded a manual back-end testing suite into a full stack end-to-end behavior-driven automated testing framework',
      ],
      tech: ['Java/Spring Boot', 'TypeScript/Angular', 'SQL', 'Selenium/Cypress/Cucumber', 'PCF', 'REST', 'Jenkins'],
    },
  ] as Experience[],
  education: [
    {
      school: 'Georgia Institute of Technology',
      location: 'Atlanta, GA',
      degree: 'Bachelor of Science in Computer Science',
      year: 'Aug 2019',
    },
  ] as Education[],
}

export const projectsContent: Record<string, Project> = {
  project1: {
    id: 'tone-chat',
    name: 'Tone Chat',
    description: 'A multi-platform chat application built with React Native and Node.js, featuring real-time messaging, tone-based message styling, and customizable themes.',
    stack: ['Node.js', 'TypeScript', 'React Native', 'Docker', 'Express', 'Socket.io', 'MongoDB', 'PostgreSQL', 'GitHub Actions'],
    github: 'github.com/mjung0802/tone-chat (private WIP)',
    demo: 'WIP - not yet publicly available',
    highlights: [
      'Real-time messaging with WebSockets and Socket.io',
      'Tone-based message styling so users can express emotions through their messages',
      'Customizable themes and user profiles for a personalized chat experience',
    ],
  },
  project2: {
    id: 'ngu-guide',
    name: 'NGU Idle Guide',
    description: 'A comprehensive crowdsourced guide for the incremental idle game "NGU Idle", which clarifies complex game mechanics and provides optimal strategies for players to progress efficiently through a game that takes over a year to complete.',
    stack: ['Astro', 'React', 'TypeScript', 'GitHub Actions'],
    github: 'github.com/sayolove/ngu-guide',
    demo: 'https://sayolove.github.io/ngu-guide/en/intro/',
    highlights: [
      'Primarily a documentation effort, involved months of gathering and organizing community knowledge into a cohesive, user-friendly format',
      'The first comprehensive guide for NGU Idle, filling a critical gap in the player community and becoming the go-to resource for new and veteran players alike',
      'Built with Astro and React for a fast, responsive experience, and deployed via GitHub Pages with automated CI/CD pipelines',
    ],
  },
  project3: {
    id: 'happytohelp',
    name: "Happy To Help",
    description: 'A web game where players take on the role of an AI LLM assistant, traversing through the history of LLM development and possible futures, while learning about the ethical and societal implications of AI along the way.',
    stack: ['Svelte', 'Vite', 'TypeScript'],
    github: 'github.com/mjung0802/happytohelp (private WIP)',
    demo: 'WIP - not yet publicly available',
    highlights: [
      'An educational narrative-driven game exploring the history and future of AI LLMs, designed to be accessible and engaging for players of all backgrounds',
      'Players navigate through different eras of AI development, making choices that impact the story and learning about the ethical considerations of AI along the way',
      'Built with Svelte and Vite for a fast, interactive experience, and designed with accessibility in mind to reach a broad audience',
    ],
  },
}

export const hobbiesContent: Hobby[] = [
  {
    name: 'cooking',
    properties: {
      cuisine: '"Asian and Mexican-inspired home cooking"',
      diners: '"family of 3"',
      'signature-dish': '"beef enoki rolls"',
      'favorite-cookbooks': '"The Joy of Cooking, The Food Lab"',
    },
  },
  {
    name: 'gaming',
    properties: {
      genres: '"RPGs, strategy games, and party games"',
      platforms: '"PC and Nintendo Switch/2"',
      'favorite-games': '"Portal 2, Civilization VI, and Pokémon Pokopia"',
      'currently-playing': '"NieR Replicant ver.1.22474487139..."',
    },
  },
  {
    name: 'event-planning',
    properties: {
      types: '"karaoke, game nights, potlucks, and more!"',
      'max-attendees': '32',
      locations: '"our home, local parks, restaurants, and specialty venues"',
      frequency: '"every 1-2 months"',
    },
  },
  {
    name: 'hiking',
    properties: {
      distance: '"3-5 miles"',
      pace: '"comfortable"',
      'favorite-trail': '"Hieroglyphic Trail, Superstition Mountains, AZ"',
      companions: '"Our two dogs, Dandy and Ollie"',
    },
  },
]
