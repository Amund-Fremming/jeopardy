import "./TextDisplay.css";

interface TextDisplayProps {
  text: string;
}

/**
 * TextDisplay Component
 * Displays text content in a centered, readable format
 * Uses orange theme colors for consistency
 */
export default function TextDisplay({ text }: TextDisplayProps) {
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
    </div>
  );
}
