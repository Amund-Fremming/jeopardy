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
   * Handle cell click - cycle through 2 states
   * State 1 (Unflipped): isFlipped=false, isRevealed=false
   * State 2 (Revealed): isFlipped=true, isRevealed=true
   * Once revealed, stays revealed
   */
  const handleCellClick = (row: number, col: number) => {
    const cell = boardData.cells[row][col];
    const isFlipped = cell.isFlipped ?? false;
    const isRevealed = cell.isRevealed ?? false;

    console.log(`🎯 Click on cell [${row}][${col}] value:$${cell.value}`, {
      currentState: { isFlipped, isRevealed },
      cellType: cell.type,
      hasContent: !!cell.content,
      hasAnswer: !!cell.answer,
    });

    if (!isFlipped && !isRevealed) {
      // State 1 → State 2: Flip the cell
      console.log(`✅ FLIPPING cell [${row}][${col}]`);
      onUpdateCell(row, col, {
        isFlipped: true,
        isRevealed: false,
      });
    } else if (isFlipped && !isRevealed) {
      // State 2 → Reveal the answer
      // For text/image: click to reveal
      // For sound: only reveal button works (do nothing on click)
      if (cell.type !== "sound") {
        console.log(`✅ REVEALING answer for cell [${row}][${col}]`);
        onUpdateCell(row, col, {
          isFlipped: true,
          isRevealed: true,
        });
      } else {
        console.log(`⏸️ Sound cell - use reveal button`);
      }
    } else {
      console.log(`🛑 Cell already revealed, no action`);
    }
  };

  /**
   * Handle reveal answer for sound cells
   */
  const handleRevealAnswer = (row: number, col: number) => {
    onUpdateCell(row, col, {
      isFlipped: true,
      isRevealed: true,
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
