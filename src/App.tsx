import { useState, useEffect, useCallback } from "react";
import { useBoardState } from "./hooks/useBoardState";
import { useAutoSave } from "./hooks/useAutoSave";
import { saveGameState, loadGameState } from "./utils/storage";
import EditorScreen from "./screens/EditorScreen";
import TeamAssignmentScreen from "./screens/TeamAssignmentScreen";
import GameScreen from "./screens/GameScreen";
import FinalScoreboardScreen from "./screens/FinalScoreboardScreen";
import ConfirmationModal from "./components/ConfirmationModal";
import type { SoundContent, Cell, Team } from "./types/board";

function App() {
  const {
    boardData,
    screenMode,
    setScreenMode,
    updateCategory,
    updateCell,
    updateTeamConfig,
    saveToStorage,
  } = useBoardState();

  // Track generated teams
  const [teams, setTeams] = useState<Team[]>([]);

  // Loading state for restoration
  const [isRestoring, setIsRestoring] = useState(true);

  // Confirmation modal state
  const [showNavigateModal, setShowNavigateModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  /**
   * Restore game state on mount
   */
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      // Restore teams
      setTeams(savedState.teams);

      // Restore screen mode
      setScreenMode(savedState.screenMode);
    }

    setIsRestoring(false);
  }, [setScreenMode]);

  /**
   * Auto-save game state every 20 seconds
   */
  const handleAutoSave = useCallback(() => {
    saveGameState({
      screenMode,
      teams,
    });
  }, [screenMode, teams]);

  useAutoSave({
    data: { screenMode, teams },
    saveFunction: handleAutoSave,
    interval: 20000, // 20 seconds
  });

  /**
   * Handle cell content update
   */
  const handleUpdateCell = (
    row: number,
    col: number,
    updates: { content?: SoundContent | string; answer?: string }
  ) => {
    updateCell(row, col, updates);
  };

  /**
   * Handle team configuration update
   */
  const handleUpdateTeamConfig = (
    numberOfTeams: number,
    playerNames: string[]
  ) => {
    updateTeamConfig(numberOfTeams, playerNames);
  };

  /**
   * Handle header click - navigate to editor with confirmation if needed
   */
  const handleHeaderClick = () => {
    // If already on editor, do nothing
    if (screenMode === "editor") return;

    // If on teamAssignment, game, or finalScore, show confirmation
    if (
      screenMode === "teamAssignment" ||
      screenMode === "game" ||
      screenMode === "finalScore"
    ) {
      setShowNavigateModal(true);
    } else {
      // Otherwise navigate directly
      navigateToEditor();
    }
  };

  /**
   * Navigate to editor and reset cell states
   */
  const navigateToEditor = () => {
    // Reset all cell states (isFlipped and isMarked) to false
    boardData.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.isFlipped || cell.isMarked) {
          updateCell(rowIndex, colIndex, { isFlipped: false, isMarked: false });
        }
      });
    });

    setScreenMode("editor");
    setShowNavigateModal(false);
  };

  /**
   * Handle reset - clear all data and localStorage
   */
  const handleReset = () => {
    // Clear localStorage
    localStorage.clear();

    // Reload to get fresh initial state
    window.location.reload();
  };

  /**
   * Handle Start Game - Save to localStorage and switch to team assignment
   */
  const handleStartGame = () => {
    saveToStorage();
    setScreenMode("teamAssignment");
  };

  /**
   * Handle Continue to Game from team assignment
   */
  const handleContinueToGame = (generatedTeams: Team[]) => {
    setTeams(generatedTeams);
    saveToStorage();
    setScreenMode("game");
  };

  /**
   * Handle score update for a team
   */
  const handleUpdateScore = (teamNumber: number, delta: number) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.teamNumber === teamNumber
          ? { ...team, score: Math.max(0, team.score + delta) }
          : team
      )
    );
  };

  /**
   * Handle finish game - navigate to final scoreboard
   */
  const handleFinishGame = () => {
    saveToStorage();
    setScreenMode("finalScore");
  };

  /**
   * Handle cell state update for game mode
   */
  const handleGameCellUpdate = (
    row: number,
    col: number,
    updates: Partial<Cell>
  ) => {
    updateCell(row, col, updates);
  };

  // Render appropriate screen based on mode

  // Show loading state during restoration
  if (isRestoring) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-header)",
          fontSize: "var(--font-size-h3)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (screenMode === "editor") {
    return (
      <>
        <EditorScreen
          boardData={boardData}
          onUpdateCategory={updateCategory}
          onUpdateCell={handleUpdateCell}
          onUpdateTeamConfig={handleUpdateTeamConfig}
          onStartGame={handleStartGame}
          onHeaderClick={handleHeaderClick}
          onReset={() => setShowResetModal(true)}
        />
        <ConfirmationModal
          isOpen={showResetModal}
          title="Reset All Data?"
          message="This will clear all board data, team configuration, and game progress. This action cannot be undone."
          confirmText="Reset Everything"
          cancelText="Cancel"
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
          danger={true}
        />
      </>
    );
  }

  if (screenMode === "teamAssignment") {
    return (
      <>
        <TeamAssignmentScreen
          numberOfTeams={boardData.numberOfTeams}
          playerNames={boardData.playerNames}
          onContinueToGame={handleContinueToGame}
          onBackToEditor={navigateToEditor}
          onHeaderClick={handleHeaderClick}
        />
        <ConfirmationModal
          isOpen={showNavigateModal}
          title="Return to Editor?"
          message="You will lose the current team assignments. You can regenerate teams later."
          confirmText="Return to Editor"
          cancelText="Stay Here"
          onConfirm={navigateToEditor}
          onCancel={() => setShowNavigateModal(false)}
        />
      </>
    );
  }

  if (screenMode === "game") {
    return (
      <>
        <GameScreen
          boardData={boardData}
          teams={teams}
          onUpdateCell={handleGameCellUpdate}
          onUpdateScore={handleUpdateScore}
          onFinishGame={handleFinishGame}
          onHeaderClick={handleHeaderClick}
        />
        <ConfirmationModal
          isOpen={showNavigateModal}
          title="Return to Editor?"
          message="You will lose the current game progress. All cell states and scores will be reset."
          confirmText="Return to Editor"
          cancelText="Continue Playing"
          onConfirm={navigateToEditor}
          onCancel={() => setShowNavigateModal(false)}
        />
      </>
    );
  }

  // Final Scoreboard Screen
  return (
    <>
      <FinalScoreboardScreen teams={teams} onHeaderClick={handleHeaderClick} />
      <ConfirmationModal
        isOpen={showNavigateModal}
        title="Return to Editor?"
        message="This will end the current game session and reset all data. Are you sure?"
        confirmText="Return to Editor"
        cancelText="Stay Here"
        onConfirm={navigateToEditor}
        onCancel={() => setShowNavigateModal(false)}
      />
    </>
  );
}

export default App;
