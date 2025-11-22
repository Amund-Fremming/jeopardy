/**
 * ScoreTable.tsx
 * Displays teams, scores, and score adjustment controls
 */

import type { Team } from "../types/board";
import "./ScoreTable.css";

interface ScoreTableProps {
  teams: Team[];
  onUpdateScore: (teamNumber: number, delta: number) => void;
  onFinishGame: () => void;
}

const ScoreTable = ({
  teams,
  onUpdateScore,
  onFinishGame,
}: ScoreTableProps) => {
  return (
    <div className="score-table-container">
      <h2 className="score-table-title">Team Scores</h2>

      <div className="score-table">
        {teams.map((team) => (
          <div key={team.teamNumber} className="team-score-row">
            <div className="team-info">
              <h3 className="team-name">Team {team.teamNumber}</h3>
              <div className="team-players">
                {team.players.map((player, index) => (
                  <span key={index} className="player-badge">
                    {player}
                  </span>
                ))}
              </div>
            </div>

            <div className="team-score-controls">
              <div className="score-display">
                ${team.score.toLocaleString()}
              </div>
              <div className="score-buttons">
                <button
                  className="score-btn decrement"
                  onClick={() => onUpdateScore(team.teamNumber, -200)}
                  type="button"
                  aria-label={`Subtract $200 from Team ${team.teamNumber}`}
                >
                  -$200
                </button>
                <button
                  className="score-btn increment"
                  onClick={() => onUpdateScore(team.teamNumber, 200)}
                  type="button"
                  aria-label={`Add $200 to Team ${team.teamNumber}`}
                >
                  +$200
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="finish-game-button"
        onClick={onFinishGame}
        type="button"
      >
        Finish Game
      </button>
    </div>
  );
};

export default ScoreTable;
