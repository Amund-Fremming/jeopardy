# Jeopardy Game Board

A fully-featured Jeopardy game board application built entirely by AI agents through orchestrated planning and execution. Supports custom content types (YouTube videos with timestamps, images, and text) in each game cell.

## ✨ Features

- **Editor Mode**: Create custom game boards with 5 categories and 25 clues
- **Content Types**: Sound (YouTube with start/end timestamps), Images, or Text
- **Game Mode**: Interactive gameplay with flip animations and state tracking
- **Persistent Storage**: Auto-save to localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile (1920px, 1024px, 768px breakpoints)
- **Dark Theme**: Claude.ai-inspired design with orange accents (#D0855E)
- **WCAG AA Compliant**: Accessible color contrast ratios

## 🏗️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **react-youtube** - YouTube player integration
- **CSS Grid** - Responsive layouts
- **localStorage** - Data persistence

## 🤖 AI-Driven Development Process

This application was built entirely through AI agent orchestration with zero manual coding:

### 1. **Context Definition** (`.github/context/`)

Created structured documentation describing the application:

- `spec.md` - Overall application specification and architecture
- `game-rules.md` - Jeopardy game rules and data structures
- `style-guide.md` - Design system (colors, typography, components)

### 2. **Planning Phase**

- **Planner Agent**: Generated initial `tasklist.md` with 11 major tasks and 60+ subtasks
- **Refiner Agent**: Validated completeness, identified 4 critical gaps:
  - Missing dependency installation tasks
  - Missing initial state/default screen setup
  - Missing data propagation logic details
  - Missing auto-generated value algorithms
- **Planner Agent**: Updated tasklist and created planning checklist for future use

### 3. **Execution Phase** (Orchestrated Loop)

For each major task (1-11):

1. **Executioner Agent**: Implemented all subtasks
2. **Refiner Agent**: Reviewed code against spec
3. **If issues found**: Executioner fixed, Refiner re-validated
4. **If approved**: Moved to next task

### 4. **Quality Assurance**

- **Refiner Agent**: Verified WCAG AA compliance, responsive design, transitions
- **All tasks**: Passed first review without requiring fixes

## 📂 Project Structure

```
src/
├── components/
│   ├── editor/          # Editor-specific components
│   │   ├── CategoryInput.tsx
│   │   ├── TypeSelector.tsx
│   │   ├── SoundInput.tsx
│   │   ├── ImageSelector.tsx
│   │   ├── TextInput.tsx
│   │   └── ContentInput.tsx
│   ├── game/            # Game-specific components
│   │   ├── GameCell.tsx
│   │   ├── SoundPlayer.tsx
│   │   ├── ImageDisplay.tsx
│   │   ├── TextDisplay.tsx
│   │   └── ContentRenderer.tsx
│   ├── BoardGrid.tsx    # Shared 6×5 grid layout
│   ├── CategoryCell.tsx # Category row cell (Editor)
│   ├── CategoryHeader.tsx # Category display (Game)
│   └── Cell.tsx         # Base cell component
├── screens/
│   ├── EditorScreen.tsx # Board editor
│   └── GameScreen.tsx   # Game interface
├── hooks/
│   └── useBoardState.ts # Centralized state management
├── types/
│   └── board.ts         # TypeScript interfaces
├── utils/
│   ├── storage.ts       # localStorage helpers
│   └── imageManifest.ts # Image asset management
└── styles/
    ├── variables.css    # Design tokens
    └── animations.css   # Keyframe animations
```

## 🎯 Implementation Highlights

### Type-Safe State Management

```typescript
interface Cell {
  value: number; // $200-$1000
  type: "sound" | "image" | "text";
  content: SoundContent | string;
  isFlipped?: boolean;
  isMarked?: boolean;
}
```

### Category-to-Column Propagation

When a category type changes, all 5 cells in that column automatically update to match the new type with appropriate empty content.

### 3-State Cell Logic

- **Unflipped**: Show dollar value
- **Flipped**: Flip animation → Show content (with 3D CSS transform)
- **Marked**: Large X overlay → Click to reset

### YouTube Timestamp Control

Plays video segments with auto-stop at end timestamp using polling (100ms interval).

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Lessons Learned

### ✅ What Worked Well

- **First Principles Planning**: Breaking down to fundamental truths produced optimal architecture
- **Completeness Checklist**: 7-point validation prevented missing critical features
- **Refiner Validation**: All tasks passed review on first attempt after improved planning
- **Orchestration Loop**: Execute → Refine → Fix cycle ensured quality at each step
- **Context Documentation**: Structured specs enabled autonomous implementation

### ⚠️ What Could Be Improved

- **Initial Planning**: First iteration missed 4 critical items (fixed in second pass)
- **Documentation Files**: Generated many intermediate .md files (could be consolidated)
- **Image Manifest**: Requires manual population (no build-time scanning implemented)

## 📄 License

MIT
