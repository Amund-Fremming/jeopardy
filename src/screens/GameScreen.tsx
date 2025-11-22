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
   * Handle cell click - simple flip to show content
   * State 1 (Unflipped): isFlipped=false
   * State 2 (Flipped): isFlipped=true (shows content)
   * Once flipped, stays flipped
   */
  const handleCellClick = (row: number, col: number) => {
    const cell = boardData.cells[row][col];
    const isFlipped = cell.isFlipped ?? false;

    if (!isFlipped) {
      onUpdateCell(row, col, {
        isFlipped: true,
      });
    }
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
