# Jeopardy App Specification

**Rules:** See [game-rules.md](./game-rules.md) | **Style:** See [style-guide.md](./style-guide.md)

## Architecture

**Screens:** Editor (default) → Game (after "Start")

---

## 1. Editor Screen

**Layout:** 6×5 grid (category row + 5 value rows)

### Category Row (5 cells)

- Text input: Category name
- Dropdown: Content type selector
  - **Sound**: YouTube URL + start/end timestamps (seconds)
  - **Image**: Dropdown of `/public/*` images
  - **Text**: Text input field

### Value Cells (5×5 = 25 cells)

Each cell:

- Input field based on category dropdown selection
- **Sound**: `{url, start, end}`
- **Image**: Image filename selector
- **Text**: Multiline text input
- No dollar values displayed

### Controls

- **Start Button** (bottom): Saves data → Navigate to Game screen

---

## 2. Game Screen

**Layout:** 6×5 grid (category headers + clue cells)

### Category Row

- Display category names (read-only)

### Clue Cells (25 cells)

Display dollar value ($200-$1000)

**States:**

1. **Unflipped:** Show dollar amount
2. **Flipped:** Flip animation → Show content
   - Sound: Play button → Play YouTube clip (start→end)
   - Image: Display image
   - Text: Display text content
3. **Marked:** Click flipped cell → Large X overlay
4. **Reset:** Click marked cell → Return to unflipped state

**Interaction Flow:**

```
Unflipped (click) → Flipped (click) → Marked (click) → Unflipped
```

---

## Data Structure

```ts
interface Cell {
  value: number; // $200-$1000
  type: "sound" | "image" | "text";
  content: SoundContent | string; // string for image filename or text
}

interface SoundContent {
  url: string; // YouTube URL
  start: number; // seconds
  end: number; // seconds
}

interface BoardData {
  categories: { name: string; type: "sound" | "image" | "text" }[5];
  cells: Cell[5][5];
}
```

---

## Implementation Notes

- **No backend:** Images from `/public/`, data in React state
- **Animations:** Flip (CSS 3D transform), X overlay (fadeIn)
- **YouTube:** Use `react-youtube` or iframe API with `start`/`end` params
- **Persistence:** Optional localStorage for editor data
