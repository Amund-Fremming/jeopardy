import BoardGrid from "../components/BoardGrid";
import CategoryHeader from "../components/CategoryHeader";
import GameCell from "../components/game/GameCell";
import ClickableHeader from "../components/ClickableHeader";
import ScoreTable from "../components/ScoreTable";
import type { BoardData, Cell, Team } from "../types/board";
import "./GameScreen.css";

interface GameScreenProps {
  boardData: BoardData;
  teams: Team[];
  onUpdateCell: (row: number, col: number, updates: Partial<Cell>) => void;
  onUpdateScore: (teamNumber: number, delta: number) => void;
  onFinishGame: () => void;
  onHeaderClick: () => void;
}

/**
 * GameScreen Component
 *
 * Layout: 6×5 grid (1 category row + 5 value rows)
 * - Category row: 5 CategoryHeader components showing category names
 * - Value rows: 25 GameCell components
 *
 * Each GameCell:
 * - Displays dollar values ($200-$1000) when unflipped
 * - Shows content (sound/image/text) when flipped
 * - Shows X overlay when marked
 * - Click cycles through states: Unflipped → Flipped → Marked → Unflipped
 */
export default function GameScreen({
  boardData,
  teams,
  onUpdateCell,
  onUpdateScore,
  onFinishGame,
  onHeaderClick,
}: GameScreenProps) {
  /**
   * Handle cell click - cycle through 4 states
   * State 1 (Unflipped): isFlipped=false, isRevealed=false, isMarked=false
   * State 2 (Flipped): isFlipped=true, isRevealed=false, isMarked=false
   * State 3 (Revealed): isFlipped=true, isRevealed=true, isMarked=false
   * State 4 (Marked): isFlipped=true, isRevealed=true, isMarked=true
   * Click on marked cell returns to unflipped state
   */
  const handleCellClick = (row: number, col: number) => {
    const cell = boardData.cells[row][col];
    const isFlipped = cell.isFlipped ?? false;
    const isRevealed = cell.isRevealed ?? false;
    const isMarked = cell.isMarked ?? false;

    if (!isFlipped && !isRevealed && !isMarked) {
      // State 1 → State 2: Flip the cell
      onUpdateCell(row, col, {
        isFlipped: true,
        isRevealed: false,
        isMarked: false,
      });
    } else if (isFlipped && !isRevealed && !isMarked) {
      // State 2 → State 3: Reveal the answer
      // For text/image: click to reveal
      // For sound: only reveal button works (do nothing on click)
      if (cell.type !== "sound") {
        onUpdateCell(row, col, {
          isFlipped: true,
          isRevealed: true,
          isMarked: false,
        });
      }
      // For sound cells, do nothing - they must use the reveal button
    } else if (isRevealed && !isMarked) {
      // State 3 → State 4: Mark the cell
      onUpdateCell(row, col, {
        isFlipped: true,
        isRevealed: true,
        isMarked: true,
      });
    } else if (isMarked) {
      // State 4 → State 1: Reset to unflipped
      onUpdateCell(row, col, {
        isFlipped: false,
        isRevealed: false,
        isMarked: false,
      });
    }
  };

  /**
   * Handle reveal answer for sound cells
   */
  const handleRevealAnswer = (row: number, col: number) => {
    onUpdateCell(row, col, {
      isFlipped: true,
      isRevealed: true,
      isMarked: false,
    });
  };

  /**
   * Handle mark as used - sets the marked state
   */
  const handleMarkAsUsed = (row: number, col: number) => {
    onUpdateCell(row, col, {
      isFlipped: true,
      isRevealed: true,
      isMarked: true,
    });
  };

  return (
    <div className="game-screen">
      <div className="game-screen__header">
        <ClickableHeader onHeaderClick={onHeaderClick} showAsSubtle={true} />
      </div>

      <div className="game-screen__content">
        <BoardGrid>
          {/* Category Row - First 5 children */}
          {boardData.categories.map((category, index) => (
            <CategoryHeader key={`category-${index}`} name={category.name} />
          ))}

          {/* Value Rows - 25 GameCells (5 rows × 5 columns) */}
          {boardData.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GameCell
                key={`cell-${rowIndex}-${colIndex}`}
                cell={cell}
                onCellClick={() => handleCellClick(rowIndex, colIndex)}
                onRevealAnswer={() => handleRevealAnswer(rowIndex, colIndex)}
                onMarkAsUsed={() => handleMarkAsUsed(rowIndex, colIndex)}
              />
            ))
          )}
        </BoardGrid>

        {/* Scoreboard Section */}
        <ScoreTable
          teams={teams}
          onUpdateScore={onUpdateScore}
          onFinishGame={onFinishGame}
        />
      </div>
    </div>
  );
}
