# src/components/layout/ Index

| File | Summary |
|------|---------|
| `AppLayout.tsx` | Root layout — composes TitleBar, ActivityBar, FileTree, EditorArea, TerminalPanel, StatusBar, CommandPalette. Manages sidebar visibility, terminal input state, command palette. Seeds "about" tab on first load |
| `AppLayout.module.css` | CSS grid layout for the full VSCode chrome |
| `ActivityBar.tsx` | Left icon strip — explorer/search/extensions icons; only explorer toggle is functional; tracks active icon visually |
| `ActivityBar.module.css` | Activity bar icon styles |
| `FileTree.tsx` | Recursive file tree from FILE_TREE data; expand/collapse folders; file click calls openTab from TabsContext |
| `FileTree.module.css` | File tree row, indent, icon, and hover styles |
| `TitleBar.tsx` | Top window chrome — traffic lights, "sayo.site" title, last pushed time (from useGithubData) |
| `TitleBar.module.css` | Title bar styles |
| `StatusBar.tsx` | Bottom bar — branch (main), 0 problems, cursor position, UTF-8, language (from route), commits this week (pulsing), theme (clickable to cycle), bell icon (active when terminal has input) |
| `StatusBar.module.css` | Status bar and pulse animation styles |
