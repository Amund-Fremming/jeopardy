/**
 * FinalScoreboardScreen.tsx
 * Displays final game results with sorted teams
 */

import type { Team } from "../types/board";
import ClickableHeader from "../components/ClickableHeader";
import "./FinalScoreboardScreen.css";

interface FinalScoreboardScreenProps {
  teams: Team[];
  onHeaderClick: () => void;
}

const FinalScoreboardScreen = ({
  teams,
  onHeaderClick,
}: FinalScoreboardScreenProps) => {
  // Sort teams by score (highest to lowest)
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  return (
    <div className="final-scoreboard-screen">
      <div className="final-scoreboard-container">
        {/* Header */}
        <div className="final-header">
          <ClickableHeader onHeaderClick={onHeaderClick} />
        </div>

        {/* Winner Section */}
        <div className="winner-section">
          <h2 className="winner-label">🏆 Winner 🏆</h2>
          <div className="winner-card">
            <h1 className="winner-team-name">Team {winner.teamNumber}</h1>
            <div className="winner-score">${winner.score.toLocaleString()}</div>
            <div className="winner-players">
              {winner.players.map((player, index) => (
                <span key={index} className="winner-player-badge">
                  {player}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* All Teams Leaderboard */}
        <div className="leaderboard-section">
          <h2 className="leaderboard-title">Final Scores</h2>
          <div className="leaderboard">
            {sortedTeams.map((team, index) => (
              <div
                key={team.teamNumber}
                className={`leaderboard-row ${
                  index === 0 ? "first-place" : ""
                }`}
              >
                <div className="rank-badge">{index + 1}</div>
                <div className="team-details">
                  <h3 className="team-name">Team {team.teamNumber}</h3>
                  <div className="team-players">
                    {team.players.map((player, pIndex) => (
                      <span key={pIndex} className="player-name">
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="team-final-score">
                  ${team.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Hint */}
        <p className="return-hint">
          Click "Jeopardy!" above to return to the editor
        </p>
      </div>
    </div>
  );
};

export default FinalScoreboardScreen;
