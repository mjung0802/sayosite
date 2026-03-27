# src/data/ Index

| File | Summary |
|------|---------|
| `content.ts` | All portfolio text content. Exports: `contactContent`, `aboutContent`, `resumeContent` (experience[], education, skills[]), `projectsContent` (tone-chat, ngu-guide, happytohelp), `hobbiesContent` (cooking, gaming, event-planning, hiking) |
| `fileTree.ts` | Virtual file tree for the UI. Exports: `FILE_TREE` (nested FileNode structure), `FILE_ICON_LABELS`/`FILE_ICON_COLORS` (emoji + color maps), `ROUTE_TO_FILE` (route → FileNode map built recursively) |
| `images.ts` | Maps routes to image asset filenames. Exports: `SECTION_IMAGES` — keys are routes (`/about`, `/projects/project1–3`, `/hobbies`), values are string arrays of image names |
