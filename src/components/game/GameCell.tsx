import { type Cell } from "../../types/board";
import ContentRenderer from "./ContentRenderer";
import "./GameCell.css";

interface GameCellProps {
  cell: Cell;
  onCellClick: () => void;
  onRevealAnswer?: () => void;
}

/**
 * GameCell component with 2-state logic:
 * State 1 (Unflipped): Show dollar amount
 * State 2 (Revealed): Show content with green answer overlay - stays this way
 *
 * Interaction: Unflipped (click) → Flipped (click or reveal button) → Revealed (stays)
 */
export default function GameCell({
  cell,
  onCellClick,
  onRevealAnswer,
}: GameCellProps) {
  const isFlipped = cell.isFlipped ?? false;
  const isRevealed = cell.isRevealed ?? false;

  // Show flipped state when flipped
  const shouldShowFlipped = isFlipped;

  // Allow clicking to flip or reveal (not when already revealed)
  const handleClick = () => {
    console.log(`🔵 GameCell handleClick - value:$${cell.value}`, {
      isFlipped,
      isRevealed,
    });
    if (!isRevealed) {
      onCellClick();
    } else {
      console.log(`🚫 Click blocked - cell already revealed`);
    }
  };

  const handleMouseEnter = () => {
    console.log(`🟡 HOVER on $${cell.value}`);
  };

  return (
    <div
      className="game-cell-container"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ border: "2px solid cyan" }} /* DEBUG: Visual indicator */
    >
      <div className={`game-cell ${shouldShowFlipped ? "flipped" : ""}`}>
        {/* Front Face - Dollar Amount */}
        <div className="game-cell-front">
          <div className="dollar-amount">${cell.value}</div>
        </div>

        {/* Back Face - Content */}
        <div className="game-cell-back">
          <div className="cell-content">
            <ContentRenderer cell={cell} onRevealAnswer={onRevealAnswer} />
          </div>

          {/* Answer Overlay - Shows when revealed */}
          {isRevealed && cell.answer && <AnswerOverlay answer={cell.answer} />}
        </div>
      </div>
    </div>
  );
}

/**
 * AnswerOverlay Component
 * Green overlay displaying the correct answer - stays visible once shown
 */
function AnswerOverlay({ answer }: { answer: string }) {
  return (
    <div className="answer-overlay">
      <div className="answer-label">Answer:</div>
      <div className="answer-text">{answer}</div>
    </div>
  );
}
