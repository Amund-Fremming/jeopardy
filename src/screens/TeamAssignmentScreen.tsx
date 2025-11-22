/**
 * TeamAssignmentScreen.tsx
 * Intermediate screen between Editor and Game
 * Randomly distributes players across teams
 */

import { useState, useEffect } from "react";
import type { Team } from "../types/board";
import ClickableHeader from "../components/ClickableHeader";
import "./TeamAssignmentScreen.css";

interface TeamAssignmentScreenProps {
  numberOfTeams: number;
  playerNames: string[];
  onContinueToGame: (teams: Team[]) => void;
  onBackToEditor: () => void;
  onHeaderClick: () => void;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate random teams from player names
 * Distributes players evenly across teams
 */
const generateTeams = (
  numberOfTeams: number,
  playerNames: string[]
): Team[] => {
  // Shuffle players for random distribution
  const shuffledPlayers = shuffleArray(playerNames);

  // Initialize teams
  const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
    teamNumber: i + 1,
    players: [],
    score: 0,
  }));

  // Distribute players evenly (round-robin)
  shuffledPlayers.forEach((player, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].players.push(player);
  });

  return teams;
};

const TeamAssignmentScreen = ({
  numberOfTeams,
  playerNames,
  onContinueToGame,
  onBackToEditor,
  onHeaderClick,
}: TeamAssignmentScreenProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);

  // Generate teams on mount with slight delay for UX
  useEffect(() => {
    const timer = setTimeout(() => {
      const generatedTeams = generateTeams(numberOfTeams, playerNames);
      setTeams(generatedTeams);
      setIsGenerating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [numberOfTeams, playerNames]);

  /**
   * Regenerate teams with new random distribution
   */
  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedTeams = generateTeams(numberOfTeams, playerNames);
      setTeams(generatedTeams);
      setIsGenerating(false);
    }, 600);
  };

  /**
   * Continue to game with current team assignments
   */
  const handleContinue = () => {
    onContinueToGame(teams);
  };

  return (
    <div className="team-assignment-screen">
      <div className="team-assignment-container">
        <header className="team-assignment-header">
          <ClickableHeader onHeaderClick={onHeaderClick} />
          <p className="subtitle">
            {playerNames.length} players randomly distributed across{" "}
            {numberOfTeams} {numberOfTeams === 1 ? "team" : "teams"}
          </p>
        </header>

        {isGenerating ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Generating teams...</p>
          </div>
        ) : (
          <>
            <div className="teams-grid">
              {teams.map((team) => (
                <div key={team.teamNumber} className="team-card">
                  <h2 className="team-title">Team {team.teamNumber}</h2>
                  <ul className="player-list">
                    {team.players.map((player, index) => (
                      <li key={index} className="player-name">
                        {player}
                      </li>
                    ))}
                  </ul>
                  {team.players.length === 0 && (
                    <p className="empty-team">No players assigned</p>
                  )}
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button
                className="button secondary"
                onClick={onBackToEditor}
                type="button"
              >
                ← Back to Editor
              </button>

              <button
                className="button secondary"
                onClick={handleRegenerate}
                type="button"
              >
                🔄 Regenerate Teams
              </button>

              <button
                className="button primary"
                onClick={handleContinue}
                type="button"
              >
                Continue to Game →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamAssignmentScreen;
