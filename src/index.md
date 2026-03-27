# src/ Index

## Root Files

| File | Summary |
|------|---------|
| `App.tsx` | Root component — wraps ThemeContext, renders SplashScreen + AppLayout |
| `main.tsx` | Entry point — mounts React with QueryClient, BrowserRouter, global styles. React Query: 1h stale, 1 retry |
| `vite-env.d.ts` | TypeScript declarations for Vite, CSS modules, raw CSS imports |

## Subdirectories

| Directory | Contents |
|-----------|---------|
| [`components/`](./components/index.md) | All UI components split into editor/, layout/, sections/, terminal/, ui/ |
| [`contexts/`](./contexts/index.md) | ThemeContext, TabsContext — app-wide state providers |
| [`data/`](./data/index.md) | Static portfolio content, file tree structure, image mappings |
| [`hooks/`](./hooks/index.md) | useTheme, useTabs, useTerminal, useGithubData |
| [`styles/`](./styles/index.md) | global.css (reset + fonts), themes.css (Dark+, Monokai, GitHub Light) |
