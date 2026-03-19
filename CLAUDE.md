# CLAUDE.md — VSCode Portfolio Site

This file documents all architectural and design decisions for this project. Reference it before making any implementation choices.

---

## Project Overview

A personal portfolio website for a software engineer, built to look and feel exactly like Visual Studio Code. Navigation is file-tree based, content renders as syntax-highlighted code in an editor area, and a terminal panel at the bottom doubles as a contact form. GitHub activity is woven into the UI chrome rather than its own section.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React + TypeScript (strict mode) |
| Build tool | Vite |
| Package manager | pnpm |
| Routing | React Router v6 |
| Styling | CSS Modules + CSS Variables |
| Animation | Framer Motion |
| Data fetching | TanStack Query (React Query) + native fetch |
| Syntax highlighting | prism-react-renderer |
| GitHub heatmap | Custom SVG component (hand-rolled, no library) |
| Contact/email | EmailJS or Formspree |
| Hosting | Vercel |

**No Redux** — TanStack Query + local state is sufficient.
**No Next.js** — static site, no SSR needed.
**No Tailwind** — CSS variables are a better fit for precise VSCode design tokens.

---

## Layout Structure

Four zones mimicking the real VSCode UI:

```
┌─────────────────────────────────────────────────────┐
│  Title Bar      [traffic lights]    portfolio.code  │
├──────────┬──────────────────────────┬───────────────┤
│ Activity │  Editor Tabs             │  Minimap      │
│   Bar    ├──────────────────────────┤               │
│  (icons) │                          │               │
├──────────┤     Main Editor          │               │
│  File    │       Area               │               │
│  Tree    │                          │               │
│          │                          │               │
├──────────┴──────────────────────────┴───────────────┤
│  Terminal Panel  (contact form)                     │
├─────────────────────────────────────────────────────┤
│  Status Bar                                         │
└─────────────────────────────────────────────────────┘
```

---

## File Tree Structure

Each file corresponds to a portfolio section. Clicking a file opens it as a tab and renders that section in the editor.

```
📁 PORTFOLIO
├── 📁 src
│   ├── 👤 about.md           → About Me
│   ├── 📄 resume.json        → Resume / Experience
│   ├── 📁 projects
│   │   ├── 🟦 project1.tsx
│   │   ├── 🟦 project2.tsx
│   │   └── 🟦 project3.tsx
│   └── 🎨 hobbies.css        → Hobbies
└── 📬 contact.sh             → Focuses the terminal panel
```

File icons use language-specific colors matching VSCode (blue `.tsx`, orange `.json`, green `.md`, etc.).

---

## Tab System

- Each clicked file opens a **tab** at the top of the editor
- Tabs show filename, language icon, and an `×` to close
- Active tab is highlighted; inactive tabs are dimmed
- A **dot** appears on the contact tab when the user starts typing (unsaved changes easter egg)
- Switching tabs uses a subtle Framer Motion fade/slide transition
- Each tab maps to a real URL via React Router (`/about`, `/resume`, `/projects/project1`, etc.) for deep-linking

---

## Section Content Design

Each section renders as syntax-highlighted "code" that is also readable content.

### `about.md`
Markdown file format. Raw markdown syntax visible (e.g. `#`, `**bold**`) with a profile photo embedded as a markdown image reference.

### `resume.json`
Pretty-printed, syntax-highlighted JSON:
```json
{
  "name": "...",
  "experience": [{ "company": "...", "role": "...", "years": "..." }],
  "skills": ["React", "TypeScript", "Python"]
}
```

### `projects/project1.tsx`
Each project is a fake-but-readable React component. A JSDoc comment block at the top carries the project description, stack, and links:
```tsx
/**
 * @project  Project Name
 * @stack    React, Node, PostgreSQL
 * @link     github.com/you/project
 */
```
Live demo and GitHub links styled as `@link` JSDoc tags or import statements.

### `hobbies.css`
Each hobby is a CSS class with thematic properties:
```css
.photography {
  frequency: weekends;
  gear: "Sony A7III";
  vibe: golden-hour;
}
```

---

## GitHub Integration

GitHub data is ambient — woven into UI chrome, not a dedicated section. Most repos are private so only aggregate, public-API-safe data is shown.

### Data shown
- **Contribution heatmap** (last 12 weeks) — in the terminal panel header
- **Commits this week** (count only) — in the status bar
- **Last pushed time** — in the title bar subtitle

### Placement details

**Terminal panel header** — heatmap renders as a neofetch-style banner above the prompt:
```
github/username   ░░▒▒▓▓██▓▒░░▒▓██░░▒▒▓█▓░░
last 12 weeks     ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
```
Hovering a cell shows a tooltip: `"3 commits · Mar 12"`.

**Status bar** — a single sync-style item:
```
↑ 9 commits this week
```
Pulses on first load, then settles. Hover shows a popover with last-updated time.

**Title bar** — understated subtitle:
```
● portfolio.code — last pushed 2 hours ago
```

### API approach
Public, unauthenticated GitHub REST API only. No token required.

| Data | Endpoint |
|---|---|
| Heatmap + weekly commits | `GET /users/{username}/events/public` — aggregate `PushEvent` by day |
| Last pushed | `GET /users/{username}` — `updated_at` field |

Degrades gracefully if rate-limited — cells render grey with `"unavailable"` tooltip.

### Heatmap implementation
Hand-rolled SVG component (~50–80 lines). No third-party heatmap library. Uses classic GitHub green palette; cells glow subtly against the dark terminal background.

---

## Terminal Panel — Contact Form

A fully interactive fake shell. Step-by-step prompt flow where each input appears as a new terminal line.

```
Welcome to [Name]'s terminal. Type 'help' to begin.

$ help
  send-message    Compose a message
  clear           Clear the terminal
  whoami          About this machine

$ send-message
  Enter your name: █
```

On successful submission:
```
✔ Message delivered to email@domain.com
✔ Confirmation sent to you@email.com
[ Press any key to clear ]
```

### Implementation notes
- Custom-built — no terminal library needed
- A `<div>` of output lines + a hidden `<input>` that captures all keystrokes
- Command history array in state
- Panel is **resizable** (drag top edge) and **collapsible**, matching VSCode behaviour
- Message delivery via EmailJS or Formspree (no backend required)

---

## Visual Theme

### Color scheme
Base: **VSCode Dark+**. Switchable to Monokai and GitHub Light via status bar theme picker (swap a class on `<body>`, all CSS variables update).

### Design tokens (CSS variables, Dark+ palette)
```css
--vscode-editor-background: #1e1e1e;
--vscode-tab-activeBackground: #1e1e1e;
--vscode-tab-inactiveBackground: #2d2d2d;
--vscode-sidebar-background: #252526;
--vscode-statusBar-background: #007acc;
--vscode-terminal-background: #1e1e1e;

/* Syntax colors */
--syntax-keyword: #569cd6;
--syntax-string: #ce9178;
--syntax-comment: #6a9955;
--syntax-function: #dcdcaa;
--syntax-number: #b5cea8;
```

### Typography
- Editor content: `JetBrains Mono` or `Fira Code` with ligatures enabled
- UI chrome (tabs, sidebar, status bar): system sans-serif

---

## Status Bar

```
⎇ main    ✓ 0 problems    Ln 1, Col 1    UTF-8    TypeScript    ↑ 9 commits this week    🔔
```

- Branch always shows `main`
- Language label updates based on active tab
- Notification bell animates when a terminal message is sent
- Theme name on the right — clickable to cycle themes

---

## Polish & Easter Eggs

- **Cmd+P / Ctrl+P** opens a fake command palette for jumping to any section
- **Breadcrumb bar** above the editor: `src > projects > project1.tsx`
- **IntelliSense tooltips** on hover over "keywords" in the resume JSON
- **Minimap** on the right — blurry but accurate representation of current section content
- **Loading splash screen** mimics VSCode startup with an extension loading bar

---

## Suggested Build Order

1. Layout shell (title bar, activity bar, panel structure, status bar)
2. CSS variable system + theme switching
3. File tree component
4. Tab system + React Router integration
5. Section content components (about, resume, projects, hobbies)
6. `prism-react-renderer` syntax highlighting
7. GitHub API integration (TanStack Query, heatmap SVG, status bar item)
8. Terminal panel (input capture, command handling, resize)
9. Contact form flow + EmailJS/Formspree wiring
10. Easter eggs + polish (command palette, IntelliSense tooltips, splash screen)
