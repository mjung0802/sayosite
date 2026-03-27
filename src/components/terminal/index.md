# src/components/terminal/ Index

| File | Summary |
|------|---------|
| `TerminalPanel.tsx` | Container — collapsible panel with resizable height (120–600px, default 220px); shows GithubHeatmap overlay, TerminalOutput, TerminalInput; collapse button |
| `TerminalPanel.module.css` | Panel layout, resize handle, collapse animation styles |
| `TerminalInput.tsx` | Input field with `$` prompt; Enter submits, ArrowUp/Down navigates history; disabled during sending; auto-focuses on mount |
| `TerminalInput.module.css` | Input row styles |
| `TerminalOutput.tsx` | Displays terminal lines with color-coded types: output, input, prompt, success, error, info; auto-scrolls to latest line |
| `TerminalOutput.module.css` | Line type color styles |
| `GithubHeatmap.tsx` | 12-week × 7-day SVG contribution grid; 4-level GitHub green color scale; hover tooltip shows date + commit count; uses hardcoded green palette |
| `GithubHeatmap.module.css` | Heatmap layout and tooltip styles |
