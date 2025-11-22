import { type Cell } from "../../types/board";
import ContentRenderer from "./ContentRenderer";
import "./GameCell.css";

interface GameCellProps {
  cell: Cell;
  onCellClick: () => void;
  onRevealAnswer?: () => void;
  onMarkAsUsed?: () => void;
}

/**
 * GameCell component with 4-state logic:
 * State 1 (Unflipped): Show dollar amount
 * State 2 (Flipped): Show content (sound/image/text) with flip animation
 * State 3 (Revealed): Show answer overlay on top of content
 * State 4 (Marked): Show X overlay on top of everything
 *
 * Interaction: Unflipped (click) → Flipped (click or reveal button) → Revealed (click) → Marked (click) → Unflipped
 */
export default function GameCell({
  cell,
  onCellClick,
  onRevealAnswer,
  onMarkAsUsed,
}: GameCellProps) {
  const isFlipped = cell.isFlipped ?? false;
  const isRevealed = cell.isRevealed ?? false;
  const isMarked = cell.isMarked ?? false;

  // Show flipped state when flipped OR marked (marked cells stay flipped)
  const shouldShowFlipped = isFlipped || isMarked;

  // Only allow clicking on unflipped cells (buttons handle all other interactions)
  const handleClick = () => {
    if (!isFlipped && !isMarked) {
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
            <ContentRenderer
              cell={cell}
              onRevealAnswer={onRevealAnswer}
              onMarkAsUsed={onMarkAsUsed}
            />
          </div>

          {/* Answer Overlay - State 3 (Revealed) */}
          {isRevealed && cell.answer && !isMarked && (
            <AnswerOverlay answer={cell.answer} />
          )}

          {/* X Overlay - State 4 (Marked) */}
          {isMarked && <XOverlay />}
        </div>
      </div>
    </div>
  );
}

/**
 * AnswerOverlay Component
 * Semi-transparent overlay displaying the correct answer
 */
function AnswerOverlay({ answer }: { answer: string }) {
  return (
    <div className="answer-overlay">
      <div className="answer-label">Answer:</div>
      <div className="answer-text">{answer}</div>
    </div>
  );
}

/**
 * X Overlay Component
 * Large, centered X that fades in when cell is marked
 */
function XOverlay() {
  return (
    <div className="x-overlay">
      <div className="x-mark">✕</div>
    </div>
  );
}
