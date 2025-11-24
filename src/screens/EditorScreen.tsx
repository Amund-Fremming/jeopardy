import { useMemo, useState } from "react";
import type { BoardData, SoundContent } from "../types/board";
import BoardGrid from "../components/BoardGrid";
import CategoryCell from "../components/CategoryCell";
import ContentInput from "../components/editor/ContentInput";
import ClickableHeader from "../components/ClickableHeader";
import "./EditorScreen.css";

interface EditorScreenProps {
  boardData: BoardData;
  onUpdateCategory: (
    index: number,
    name: string,
    type: "sound" | "image" | "text"
  ) => void;
  onUpdateCell: (
    row: number,
    col: number,
    updates: { content?: SoundContent | string; answer?: string }
  ) => void;
  onUpdateTeamConfig: (numberOfTeams: number, playerNames: string[]) => void;
  onStartGame: () => void;
  onHeaderClick: () => void;
  onReset: () => void;
}

/**
 * EditorScreen component
 * Displays 6×5 grid: 1 category row + 5 value rows with ContentInput components
 * Includes validation and Start Game button
 */
export default function EditorScreen({
  boardData,
  onUpdateCategory,
  onUpdateCell,
  onUpdateTeamConfig,
  onStartGame,
  onHeaderClick,
  onReset,
}: EditorScreenProps) {
  const [playerNamesText, setPlayerNamesText] = useState(
    boardData.playerNames.join("\n")
  );

  /**
   * Validate that all cells have content before starting game
   */
  const validateBoard = useMemo(() => {
    // Check all categories have names
    const categoriesValid = boardData.categories.every(
      (cat) => cat.name.trim() !== ""
    );

    // Check all cells have content
    const cellsValid = boardData.cells.every((row) =>
      row.every((cell) => {
        if (cell.type === "sound") {
          const content = cell.content as SoundContent;
          return (
            content.url.trim() !== "" &&
            content.start >= 0 &&
            content.end > content.start
          );
        }
        // For image and text types, content should be non-empty string
        return typeof cell.content === "string" && cell.content.trim() !== "";
      })
    );

    // Check team configuration
    const teamsValid =
      boardData.numberOfTeams > 0 && boardData.playerNames.length > 0;

    return categoriesValid && cellsValid && teamsValid;
  }, [boardData]);

  /**
   * Handle player names textarea change
   */
  const handlePlayerNamesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    setPlayerNamesText(text);
    const names = text
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    onUpdateTeamConfig(boardData.numberOfTeams, names);
  };

  /**
   * Handle number of teams change
   */
  const handleNumberOfTeamsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = parseInt(e.target.value) || 0;
    onUpdateTeamConfig(num, boardData.playerNames);
  };

  /**
   * Handle Start Game button click
   */
  const handleStartGame = () => {
    if (!validateBoard) {
      alert(
        "Please complete all requirements:\n" +
          "- Fill in all category names\n" +
          "- Fill in all cell content\n" +
          "- Set number of teams (minimum 1)\n" +
          "- Add at least one player name"
      );
      return;
    }
    onStartGame();
  };

  return (
    <div className="editor-screen">
      <div className="editor-container">
        {/* Header */}
        <div className="editor-header">
          <ClickableHeader onHeaderClick={onHeaderClick} />
          <button className="reset-button" onClick={onReset} type="button">
            Reset All Data
          </button>
        </div>

        <BoardGrid>
          {/* Category Row - 5 CategoryCell components */}
          {boardData.categories.map((category, index) => (
            <CategoryCell
              key={`category-${index}`}
              name={category.name}
              type={category.type}
              onNameChange={(name) =>
                onUpdateCategory(index, name, category.type)
              }
              onTypeChange={(type) =>
                onUpdateCategory(index, category.name, type)
              }
            />
          ))}

          {/* Value Rows - 25 ContentInput components (5 rows × 5 columns) */}
          {boardData.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <ContentInput
                key={`cell-${rowIndex}-${colIndex}`}
                type={cell.type}
                content={cell.content}
                onChange={(content) =>
                  onUpdateCell(rowIndex, colIndex, { content })
                }
              />
            ))
          )}
        </BoardGrid>

        {/* Team Configuration Section */}
        <div className="team-configuration">
          <h3>Team Configuration</h3>

          <div className="team-input-group">
            <label htmlFor="numberOfTeams">Number of Teams:</label>
            <input
              id="numberOfTeams"
              type="number"
              min="1"
              max="10"
              value={boardData.numberOfTeams}
              onChange={handleNumberOfTeamsChange}
              className="number-input"
            />
          </div>

          <div className="team-input-group">
            <label htmlFor="playerNames">Player Names (one per line):</label>
            <textarea
              id="playerNames"
              value={playerNamesText}
              onChange={handlePlayerNamesChange}
              className="player-names-textarea"
              rows={8}
            />
            <span className="player-count">
              {boardData.playerNames.length} player(s) added
            </span>
          </div>
        </div>

        {/* Start Game Button */}
        <button
          className={`start-game-button ${!validateBoard ? "disabled" : ""}`}
          onClick={handleStartGame}
          disabled={!validateBoard}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
