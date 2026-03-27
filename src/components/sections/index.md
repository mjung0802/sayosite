# src/components/sections/ Index

| File | Summary |
|------|---------|
| `About.tsx` | Renders `aboutContent` as syntax-highlighted Markdown code block (fullName, role, location, bio, contact links) |
| `Resume.tsx` | Split-pane: left = resume.json with syntax highlighting + IntelliSense tooltips on TypeScript/React/Node.js; right = embedded resume PDF iframe |
| `Resume.module.css` | Split-pane layout styles |
| `Project.tsx` | Generates fake TSX code from `projectsContent` keyed by route param (project1/2/3). Builds import statements from stack, JSDoc block with highlights/links, and mock component definition |
| `Hobbies.tsx` | Renders `hobbiesContent` as CSS syntax-highlighted code — each hobby is a CSS class with thematic properties (cooking, gaming, event-planning, hiking) |
| `Contact.tsx` | Renders `contactContent` as a bash script with EMAIL and GITHUB variables; instructs user to use the terminal panel to send a message |
