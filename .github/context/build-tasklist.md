# Jeopardy Implementation Tasklist

## 1. Foundation & Data Layer

- [ ] Define TypeScript interfaces (`BoardData`, `Cell`, `SoundContent`, `CellType`)
- [ ] Create initial board state structure (5 categories, 25 cells with $200-$1000 values)
- [ ] Initialize 25 cells with empty content (empty SoundContent or empty strings based on type)
- [ ] Implement automatic cell value assignment (row index × $200: row 0=$200, row 1=$400, row 2=$600, row 3=$800, row 4=$1000)
- [ ] Implement React state management (board data + screen toggle, default to Editor)
- [ ] Add localStorage helpers (save/load board data)
- [ ] Create image manifest (hardcoded array of filenames in `/public/images/`)
- [ ] Install dependencies (`npm install react-youtube` for YouTube playback)

## 2. Styling & Theme Setup

- [ ] Create CSS variables file (colors, spacing, typography, shadows)
- [ ] Implement global dark theme styles (#1E1E1E backgrounds, #CC785C orange)
- [ ] Add animation keyframes (flip, fadeIn, slideUp, pulse)

## 3. Shared Components

- [ ] Build `BoardGrid` component (6×5 layout, accepts children)
- [ ] Create `CategoryCell` component (contains BOTH text input AND type dropdown, orange styled)
- [ ] Create `CategoryHeader` component (read-only orange text display for Game screen)
- [ ] Build base `Cell` component (reusable container with border/radius/hover)

## 4. Editor Screen - Category Controls

- [ ] Create `CategoryInput` component (text input for category name)
- [ ] Build `TypeSelector` dropdown (sound/image/text options)
- [ ] Implement category state updates (name + type per column)

## 5. Editor Screen - Content Inputs

- [ ] Create `SoundInput` component (YouTube URL + start/end number inputs with validation)
- [ ] Build `ImageSelector` dropdown (populate from image manifest array)
- [ ] Create `TextInput` component (multiline textarea)
- [ ] Implement `ContentInput` wrapper (renders input based on category type)
- [ ] Add input validation (YouTube URL format, required fields, numeric timestamps)

## 6. Editor Screen - Assembly

- [ ] Build `EditorScreen` layout (grid + 25 content inputs)
- [ ] Add "Start Game" button (orange, bottom of screen)
- [ ] Implement category-to-column propagation logic (when category type changes, update type for all 5 cells in that column)
- [ ] Connect category type dropdown onChange handler to column cell updates
- [ ] Implement data validation before starting game (ensure all cells have content)
- [ ] Connect Start button to localStorage save operation
- [ ] Update `App.tsx` to render `EditorScreen` as default initial screen
- [ ] Load saved data from localStorage on Editor mount (if exists)tes
- [ ] Implement data validation before starting game (ensure all cells have content)
- [ ] Update `App.tsx` to render `EditorScreen` as default initial screen

## 7. Game Screen - Cell States

- [ ] Create `GameCell` component with 3-state logic (unflipped/flipped/marked)
- [ ] Implement click handler (cycles: unflipped → flipped → marked → unflipped)

## 8. Game Screen - Content Display

- [ ] Build `SoundPlayer` component (YouTube iframe with start/end params, manual play button)
- [ ] Implement YouTube player stop at end timestamp logic
- [ ] Create `ImageDisplay` component (centered image from `/public/images/`)
- [ ] Build `TextDisplay` component (centered text, readable size)
- [ ] Implement `ContentRenderer` (switches on cell type)

## 9. Game Screen - Assembly

- [ ] Build `GameScreen` layout (category headers + 25 game cells)
- [ ] Display dollar values on unflipped cells ($200-$1000)
- [ ] Integrate `ContentRenderer` in flipped state
- [ ] Add category names to header row using `CategoryHeader` component
- [ ] Initialize individual cell states (unflipped/flipped/marked) for all 25 cells

## 10. Integration & Navigation

- [x] Implement screen routing (Editor ↔ Game toggle via state)
- [x] Pass board data from Editor to Game screen (shared state in App.tsx)
- [x] Add "Back to Editor" button on Game screen (optional)
- [x] Ensure cell states reset when returning to Editor
- [x] Test full flow: Edit → Start → Play → Reset cells → Back to Editor

## 11. Polish & Refinement

- [x] Ensure WCAG AA contrast compliance (orange #CC785C on dark)
- [x] Add hover states to all interactive elements (orange glow)
- [x] Test responsive breakpoints (1920px, 1024px, 768px)
- [x] Verify YouTube player works with timestamp params (`&start=X&end=Y`)
- [x] Add smooth transitions (0.2s ease on all interactions)
