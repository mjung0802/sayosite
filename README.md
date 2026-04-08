# sayosite

A personal portfolio website built to look and feel like Visual Studio Code. Navigation is file-tree based, content renders as syntax-highlighted code in an editor area, and a terminal panel at the bottom doubles as a contact form.

## Features

- **VSCode UI** — title bar, activity bar, file tree, editor tabs, terminal panel, and status bar all faithfully recreated
- **File-based navigation** — clicking files in the sidebar opens them as tabs and routes to the corresponding section
- **Syntax-highlighted content** — each section renders as realistic, readable code (`.md`, `.json`, `.tsx`, `.css`, `.sh`)
- **Interactive terminal** — a fake shell at the bottom serves as a contact form with a step-by-step prompt flow, powered by EmailJS
- **GitHub integration** — contribution heatmap, commits this week, and last push time woven into the UI chrome
- **Command palette** — `Ctrl+P` / `Cmd+P` opens a fuzzy-filtered file launcher
- **Theme switcher** — Dark+, Monokai, and GitHub Light, toggled from the status bar
- **IntelliSense tooltips** — hover over keywords in the resume JSON view
- **Loading splash screen** — mimics VSCode startup with fake extension activations

## Sections

| File | Content |
|------|---------|
| `about.md` | Bio, role, location, and contact links |
| `resume.json` | Experience and skills with an embedded PDF |
| `projects/project1.tsx` | tone-chat |
| `projects/project2.tsx` | ngu-guide |
| `projects/project3.tsx` | happytohelp |
| `hobbies.css` | Hobbies as CSS classes |
| `contact.sh` | Focuses the terminal contact form |

## Tech Stack

- **React + TypeScript** (strict mode)
- **Vite** — build tool
- **React Router v6** — client-side routing and deep-linking
- **TanStack Query** — GitHub data fetching
- **prism-react-renderer** — syntax highlighting
- **Framer Motion** — tab and transition animations
- **CSS Modules + CSS Variables** — VSCode design tokens
- **EmailJS** — contact form delivery
- **Vercel** — hosting

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT
