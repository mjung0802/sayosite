# src/hooks/ Index

| File | Summary |
|------|---------|
| `useTheme.ts` | Manages theme state with localStorage persistence. Exports `Theme` union type. Returns `{ theme, setTheme, cycleTheme, themeLabel }`. Syncs theme to `document.body` class |
| `useTabs.ts` | Tab management via React Router location/navigate. Exports `TabEntry` interface. Handles open/close/activate with route navigation; normalizes `/` → `/about` |
| `useTerminal.ts` | Terminal state machine for contact form flow: idle → name → email → message → sending → done/error. Commands: `help`, `send-message`, `clear`, `whoami`. EmailJS integration for submission. Returns `{ lines, step, handleCommand, navigateHistory }` |
| `useGithubData.ts` | Fetches GitHub contribution data from `/api/github` via React Query. Returns `{ heatmapCells: HeatmapCell[], commitsThisWeek, lastPushed, isError, isLoading }`. 12 weeks of data, degrades gracefully on error |
