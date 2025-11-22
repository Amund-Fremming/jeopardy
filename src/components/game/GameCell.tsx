import { type Cell } from "../../types/board";
import ContentRenderer from "./ContentRenderer";
import "./GameCell.css";

interface GameCellProps {
  cell: Cell;
  onCellClick: () => void;
}

/**
 * GameCell component - simple flip to show content
 * State 1 (Unflipped): Show dollar amount
 * State 2 (Flipped): Show content (image/text/sound) - stays flipped
 */
export default function GameCell({ cell, onCellClick }: GameCellProps) {
  const isFlipped = cell.isFlipped ?? false;

  // Show flipped state when flipped
  const shouldShowFlipped = isFlipped;

  // Allow clicking only when not flipped
  const handleClick = () => {
    if (!isFlipped) {
      onCellClick();
    }
  };

  return (
    <div className="game-cell-container" onClick={handleClick}>
      <div className={`game-cell ${shouldShowFlipped ? "flipped" : ""}`}>
        {/* Front Face - Dollar Amount */}
        <div className="game-cell-front">
          <div className="dollar-amount">${cell.value}</div>
        </div>

        {/* Back Face - Content */}
        <div className="game-cell-back">
          <div className="cell-content">
            <ContentRenderer cell={cell} />
          </div>
        </div>
      </div>
    </div>
  );
}
