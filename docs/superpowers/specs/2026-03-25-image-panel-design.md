# Image Panel — Design Spec
**Date:** 2026-03-25

## Context

The portfolio's editor area has space on the right side (originally planned as a minimap, never built). The user wants a column of up to 4 small image thumbnails there, one set per section. Clicking a thumbnail animates it to full-screen center; clicking outside (or pressing Escape) animates it back to its original position.

---

## Architecture

`EditorArea.body` is already a flex row (`display: flex`, default row direction). Currently it contains only `EditorContent` (flex: 1). We add `ImagePanel` as a second flex child, fixed at ~120px wide, rendered after `EditorContent`. `ImagePanel` renders nothing when the active section has no images configured — the column disappears and `EditorContent` fills the space.

**Files to create:**
- `src/data/images.ts` — route-to-filenames map
- `src/components/editor/ImagePanel.tsx` — column + lightbox component
- `src/components/editor/ImagePanel.module.css` — styles

**Files to modify:**
- `src/components/editor/EditorArea.tsx` — add `<ImagePanel />` inside `.body`

---

## Data

`src/data/images.ts`:

```ts
export const SECTION_IMAGES: Record<string, string[]> = {
  '/about':             ['about1', 'about2', 'about3', 'about4'],
  '/projects/project1': ['project1-1', 'project1-2', 'project1-3', 'project1-4'],
  '/projects/project2': ['project2-1', 'project2-2', 'project2-3', 'project2-4'],
  '/projects/project3': ['project3-1', 'project3-2', 'project3-3', 'project3-4'],
  '/hobbies':           ['hobbies1', 'hobbies2', 'hobbies3', 'hobbies4'],
}
```

Images live in `/public/images/` as `.png` files (e.g. `/images/about1.png`). Routes not in the map (Resume, Contact) show no column.

---

## ImagePanel Component

### State
- `selectedId: string | null` — the name of the currently expanded image, or null
- `failedImages: Set<string>` — tracks images that failed to load (React state, not DOM mutation)

### Thumbnail rendering
- Reads `activeRoute` from `TabsContext`
- Looks up `SECTION_IMAGES[activeRoute]` — if undefined or empty, returns `null`
- Filters out any names present in `failedImages`
- If all images filtered out, returns `null` (hides column)
- Renders a `<LayoutGroup>` containing a `<div className={styles.panel}>` with up to 4 `motion.img` elements
- Each `motion.img`:
  - `layoutId`: `"img-${name}"` (e.g. `"img-about1"`)
  - `src`: `/images/${name}.png`
  - `alt`: image name as fallback alt text
  - `onError`: adds name to `failedImages` set
  - `onClick`: sets `selectedId` to this image's name
- Reset `failedImages` when `activeRoute` changes (new section = new images to try)

### Lightbox (portal)
- Wrap portal content in `<AnimatePresence>` (inside the same `<LayoutGroup>`)
- When `selectedId !== null`, `ReactDOM.createPortal` renders into `document.body`:
  - A `motion.div` backdrop: full-screen, semi-transparent, `z-index: 9999`
    - `onClick`: resets `selectedId` to null
    - Fades in/out: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}`
  - A `motion.div` centering wrapper: `position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 10000; pointer-events: none`
    - Contains `motion.img` with the same `layoutId` as the selected thumbnail
    - `max-width: 80vw`, `max-height: 80vh`, `object-fit: contain`
    - `pointer-events: auto` on the image itself

**Important:** Centering uses flexbox on a wrapper, NOT `transform: translate(-50%, -50%)`. Framer Motion controls `transform` for `layoutId` animations — a CSS transform would conflict and break the interpolation.

### Keyboard dismissal
- `useEffect` registers a `keydown` listener when `selectedId !== null`
- Pressing `Escape` resets `selectedId` to null

### Section transitions
- When `activeRoute` changes, the image set swaps. Wrap the thumbnail list in `<AnimatePresence mode="wait">` keyed by `activeRoute` so old thumbnails fade out before new ones fade in.

### Column visibility
The panel renders conditionally — not rendered at all when no valid images exist. No CSS toggle needed.

---

## Styles (`ImagePanel.module.css`)

```css
.panel {
  width: 120px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: var(--vscode-editor-background);
  border-left: 1px solid var(--vscode-border);
  overflow-y: auto;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.15s;
}

.thumbnail:hover {
  border-color: var(--vscode-border);
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.lightboxWrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  pointer-events: none;
}

.lightboxImage {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 6px;
  pointer-events: auto;
}
```

---

## Animation Details

- `<LayoutGroup>` wraps both the thumbnail column and the portal's `<AnimatePresence>` — required for `layoutId` to work across the portal boundary
- `layoutId` on both thumbnail and lightbox `motion.img` enables automatic FLIP animation
- `AnimatePresence` wraps portal content for enter/exit animations
- Backdrop fades in/out with opacity animation
- Section change: `AnimatePresence mode="wait"` keyed by route for crossfade between image sets
- Tunable spring: `transition={{ type: 'spring', stiffness: 300, damping: 30 }}` — adjust as needed

---

## Verification

1. Place a test image at `/public/images/about1.png`
2. Navigate to `/about` — image panel column appears with one thumbnail
3. Click thumbnail — image expands to center with smooth animation
4. Click backdrop — image returns to thumbnail with smooth animation
5. Press Escape while lightbox is open — same dismiss behavior
6. Navigate to `/resume` — column disappears, editor expands to fill
7. Navigate to `/projects/project1` — column appears with project1-1 through project1-4 (or fewer if not all placed)
8. Missing images (no file placed yet) render nothing — no broken image icons, no empty column
9. Switch between `/about` and `/hobbies` — thumbnails crossfade between sections
