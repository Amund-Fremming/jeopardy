import { useState } from "react";
import GameCell from "./GameCell";
import type { Cell } from "../../types/board";
import "./GameCellExample.css";

/**
 * Integration Example: GameCell with 3-State Cycle
 *
 * This demonstrates how to integrate GameCell into the Game screen.
 * The handleCellClick function implements the complete state cycle:
 *
 * State 1 (Unflipped): isFlipped=false, isMarked=false → Show dollar amount
 * State 2 (Flipped):   isFlipped=true,  isMarked=false → Show content with flip animation
 * State 3 (Marked):    isFlipped=true,  isMarked=true  → Show X overlay
 * State 4 (Reset):     Click again returns to State 1
 *
 * Click flow: Unflipped → Flipped → Marked → Unflipped
 */
export default function GameCellExample() {
  // Example cell data
  const [cells, setCells] = useState<Cell[]>([
    {
      value: 200,
      type: "text",
      content: "This is a text clue!",
      isFlipped: false,
      isMarked: false,
    },
    {
      value: 400,
      type: "image",
      content: "example.jpg",
      isFlipped: false,
      isMarked: false,
    },
    {
      value: 600,
      type: "sound",
      content: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        start: 0,
        end: 30,
      },
      isFlipped: false,
      isMarked: false,
    },
  ]);

  /**
   * Handle cell click - Implements 3-state cycle
   *
   * State transitions:
   * 1. Unflipped (both false) → Flipped (isFlipped=true)
   * 2. Flipped (isFlipped=true, isMarked=false) → Marked (isMarked=true)
   * 3. Marked (both true) → Unflipped (both false)
   */
  const handleCellClick = (index: number) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      const cell = newCells[index];

      // State 1 → State 2: Unflipped to Flipped
      if (!cell.isFlipped && !cell.isMarked) {
        newCells[index] = { ...cell, isFlipped: true };
      }
      // State 2 → State 3: Flipped to Marked
      else if (cell.isFlipped && !cell.isMarked) {
        newCells[index] = { ...cell, isMarked: true };
      }
      // State 3 → State 1: Marked to Unflipped (reset)
      else if (cell.isMarked) {
        newCells[index] = { ...cell, isFlipped: false, isMarked: false };
      }

      return newCells;
    });
  };

  return (
    <div className="game-cell-example">
      <h2>GameCell Integration Example</h2>
      <p className="instructions">
        Click each cell to cycle through states: Unflipped → Flipped → Marked →
        Unflipped
      </p>

      <div className="example-grid">
        {cells.map((cell, index) => (
          <div key={index} className="example-cell-wrapper">
            <GameCell cell={cell} onCellClick={() => handleCellClick(index)} />
            <div className="state-indicator">
              State:{" "}
              {!cell.isFlipped && !cell.isMarked
                ? "1 (Unflipped)"
                : cell.isFlipped && !cell.isMarked
                ? "2 (Flipped)"
                : "3 (Marked)"}
            </div>
          </div>
        ))}
      </div>

      <div className="integration-notes">
        <h3>Integration Notes:</h3>
        <ul>
          <li>✅ Flip animation: 0.6s CSS 3D transform</li>
          <li>✅ X overlay fades in when marked</li>
          <li>✅ Click cycles through all 3 states</li>
          <li>✅ Returns to unflipped state after marked</li>
          <li>🔄 Next: Integrate ContentRenderer for actual content display</li>
        </ul>
      </div>
    </div>
  );
}
