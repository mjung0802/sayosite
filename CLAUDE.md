# CLAUDE.md — VSCode Portfolio Site

This file documents all architectural and design decisions for this project. Reference it before making any implementation choices.

---

## Index System

Every directory under `src/` contains an `index.md` summarizing its files.
**Always read the relevant `index.md` first** before opening source files — this avoids unnecessary file reads and reduces token usage. Start with `src/index.md` for a full map, then drill into subdirectory indexes as needed.

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
| Contact/email | EmailJS |
| Hosting | Vercel |

**No Redux** — TanStack Query + local state is sufficient.
**No Next.js** — static site, no SSR needed.
**No Tailwind** — CSS variables are a better fit for precise VSCode design tokens.

---

## Layout Structure

Five zones mimicking the real VSCode UI:

```
┌─────────────────────────────────────────────────────┐
│  Title Bar      [traffic lights]    sayo.site       │
├──────────┬──────────────────────────┬───────────────┤
│ Activity │  Editor Tabs             │               │
│   Bar    ├──────────────────────────┤  Image Panel  │
│  (icons) │                          │  (per-section │
├──────────┤     Main Editor          │   gallery)    │
│  File    │       Area               │               │
│  Tree    │                          │               │
│          │                          │               │
├──────────┴──────────────────────────┴───────────────┤
│  Terminal Panel  (contact form + GitHub heatmap)    │
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
│   │   ├── 🟦 project1.tsx   → tone-chat
│   │   ├── 🟦 project2.tsx   → ngu-guide
│   │   └── 🟦 project3.tsx   → happytohelp
│   └── 🎨 hobbies.css        → Hobbies
└── 📬 contact.sh             → Focuses the terminal panel
```

File icons use language-specific colors matching VSCode (blue `.tsx`, orange `.json`, green `.md`, etc.). Structure is defined in `src/data/fileTree.ts`.

---

## Tab System

- Each clicked file opens a **tab** at the top of the editor
- Tabs show filename, language icon, and an `×` to close
- Active tab is highlighted; inactive tabs are dimmed
- A **dot** appears on the contact tab when the user starts typing (unsaved changes easter egg) — driven by `terminalInput` bool in TabsContext
- Switching tabs uses a subtle Framer Motion fade/slide transition
- Each tab maps to a real URL via React Router (`/about`, `/resume`, `/projects/project1`, etc.) for deep-linking
- Tab state is managed in `TabsContext` via the `useTabs` hook; `/` normalises to `/about`

---

## Section Content Design

Each section renders as syntax-highlighted "code" that is also readable content. Syntax highlighting is handled by `SyntaxHighlighter.tsx` using prism-react-renderer.

### `about.md`
Markdown file format. Raw markdown syntax visible (e.g. `#`, `**bold**`) showing fullName, role, location, bio, and contact links. Content sourced from `aboutContent` in `src/data/content.ts`.

### `resume.json`
Split-pane layout: left side shows pretty-printed, syntax-highlighted JSON with IntelliSense tooltips on hover over TypeScript/React/Node.js keywords; right side shows an embedded resume PDF iframe. Content from `resumeContent` in `src/data/content.ts`.

### `projects/project1–3.tsx`
Each project generates a fake-but-readable React component from `projectsContent` keyed by route param. Includes import statements built from stack, a JSDoc block with `@project`, `@stack`, `@highlights`, `@link` tags, and a mock component definition. Live demo and GitHub links are clickable (SyntaxHighlighter auto-linkifies URLs).

Projects: `tone-chat` (project1), `ngu-guide` (project2), `happytohelp` (project3).

### `hobbies.css`
Each hobby is rendered as a CSS class with thematic properties. Content from `hobbiesContent` in `src/data/content.ts`. Hobbies: cooking, gaming, event-planning, hiking.

### `contact.sh`
Renders `contactContent` as a bash script with EMAIL and GITHUB variables and instructions to use the terminal panel. No interactive form here — the terminal is the form.

---

## Image Panel

A right-side gallery rendered inside `EditorArea` alongside each section. Images are mapped per-route in `src/data/images.ts` (`SECTION_IMAGES`). Clicking a thumbnail opens a lightbox modal; Escape dismisses it. Broken/missing images are hidden gracefully. Component: `src/components/editor/ImagePanel.tsx`.

---

## State Architecture

### Contexts
- **ThemeContext** (`src/contexts/ThemeContext.tsx`) — exposes `{ theme, cycleTheme, themeLabel }`. Backed by `useTheme` hook with localStorage persistence. Theme syncs to `document.body` class.
- **TabsContext** (`src/contexts/TabsContext.tsx`) — exposes `{ tabs, activeRoute, openTab, closeTab, activateTab, terminalInput }`. Backed by `useTabs` hook using React Router location/navigate.

### Hooks
- `useTheme` — theme state + localStorage + body class sync
- `useTabs` — tab array + routing; normalises `/` → `/about`
- `useTerminal` — contact form state machine (idle → name → email → message → sending → done/error); commands: `help`, `send-message`, `clear`, `whoami`; EmailJS submission
- `useGithubData` — fetches from `/api/github` via React Query; returns `heatmapCells[]`, `commitsThisWeek`, `lastPushed`

---

## GitHub Integration

GitHub data is ambient — woven into UI chrome, not a dedicated section.

### Data shown
- **Contribution heatmap** (last 12 weeks) — in the terminal panel header
- **Commits this week** (count only) — in the status bar
- **Last pushed time** — in the title bar subtitle

### API approach
Data is fetched from the `/api/github` proxy endpoint via React Query (`useGithubData` hook). The hook returns structured data; raw GitHub API calls happen server-side. Degrades gracefully if unavailable — heatmap cells render as grey with `"unavailable"` tooltip.

### Heatmap implementation
Hand-rolled SVG in `GithubHeatmap.tsx` (~12 weeks × 7 days grid). 4-level GitHub green color scale. Hover tooltip shows date and commit count. No third-party heatmap library.

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
- Custom-built — no terminal library
- `TerminalOutput` renders color-coded lines (output, input, prompt, success, error, info)
- `TerminalInput` captures keystrokes; Enter submits, ArrowUp/Down navigates history
- Panel is **resizable** (drag top edge; min 120px, max 600px, default 220px) and **collapsible**
- Message delivery via EmailJS (wired in `useTerminal`)
- GitHub heatmap renders as an overlay in the panel header above the prompt

---

## Visual Theme

### Color scheme
Base: **VSCode Dark+**. Switchable to Monokai and GitHub Light via status bar theme picker (swaps a class on `<body>`, all CSS variables update). Three themes defined in `src/styles/themes.css`.

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
- Editor content: `JetBrains Mono` with ligatures enabled
- UI chrome (tabs, sidebar, status bar): system sans-serif

---

## Status Bar

```
⎇ main    ✓ 0 problems    Ln 1, Col 1    UTF-8    TypeScript    ↑ 9 commits this week    🔔
```

- Branch always shows `main`
- Language label updates based on active tab route
- Commits this week pulses on first load, then settles; sourced from `useGithubData`
- Theme name on the right — clickable to cycle through Dark+, Monokai, GitHub Light
- Notification bell is active (lit) when terminal has pending input (`terminalInput` from TabsContext)

---

## Polish & Easter Eggs

- **Cmd+P / Ctrl+P** — command palette (`CommandPalette.tsx`); fuzzy-filters 7 portfolio items; keyboard navigable
- **Breadcrumb bar** — above the editor, derived from current route (e.g. `src › projects › project1.tsx`)
- **IntelliSense tooltips** — hover over TypeScript/React/Node.js keywords in the resume JSON
- **Loading splash screen** — mimics VSCode startup with fake extension activations + progress bar; shown once per browser via localStorage
- **Unsaved dot** — appears on the contact tab whenever the terminal input is non-empty
