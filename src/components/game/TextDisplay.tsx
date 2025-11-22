import "./TextDisplay.css";

interface TextDisplayProps {
  text: string;
  showRevealButton?: boolean;
  onReveal?: (e: React.MouseEvent) => void;
}

/**
 * TextDisplay Component
 * Displays text content in a centered, readable format
 * Uses orange theme colors for consistency
 */
export default function TextDisplay({
  text,
  showRevealButton,
  onReveal,
}: TextDisplayProps) {
  // Handle empty text
  if (!text || text.trim().length === 0) {
    return (
      <div className="text-display-error">
        <div className="error-icon">📝</div>
        <div className="error-message">No text content</div>
      </div>
    );
  }

  return (
    <div className="text-display">
      <p className="display-text">{text}</p>
      {showRevealButton && (
        <div className="action-buttons">
          <button className="reveal-button" onClick={onReveal}>
            Reveal Answer
          </button>
        </div>
      )}
    </div>
  );
}
