# src/components/editor/ Index

| File | Summary |
|------|---------|
| `EditorArea.tsx` | Container — composes TabBar, Breadcrumb, EditorContent (routes), and ImagePanel |
| `EditorArea.module.css` | Layout styles for editor container |
| `TabBar.tsx` | Animated tab row (Framer Motion). Renders open tabs; shows unsaved dot on contact tab when terminal has input |
| `TabBar.module.css` | Tab bar layout and animation styles |
| `Tab.tsx` | Single tab — icon, filename, close button (×), unsaved dot indicator; click activates, × closes |
| `Tab.module.css` | Individual tab styles (active/inactive states, hover) |
| `EditorContent.tsx` | Lazy-loaded route switcher via React Router — renders About/Resume/Project/Hobbies/Contact with error boundary + Suspense |
| `EditorContent.module.css` | Editor content area styles |
| `Breadcrumb.tsx` | Derives path string from current route (e.g. `src › projects › project1.tsx`) and renders it |
| `Breadcrumb.module.css` | Breadcrumb bar styles |
| `EditorErrorBoundary.tsx` | Error boundary for editor content; shows error message + retry button |
| `EditorErrorBoundary.module.css` | Error state styles |
| `ImagePanel.tsx` | Right-side image gallery using SECTION_IMAGES; lightbox modal on click; hides broken images |
| `ImagePanel.module.css` | Image panel and lightbox styles |
| `SyntaxHighlighter.tsx` | Prism-based code renderer; maps app themes → Prism themes; auto-linkifies URLs/mailto/GitHub in code; supports word wrap |
| `SyntaxHighlighter.module.css` | Code block styles |
