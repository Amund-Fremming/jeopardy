/**
 * ClickableHeader.tsx
 * Reusable header component for all screens
 * Returns to editor on click (with confirmation if needed)
 */

import "./ClickableHeader.css";

interface ClickableHeaderProps {
  onHeaderClick: () => void;
  showAsSubtle?: boolean;
}

const ClickableHeader = ({
  onHeaderClick,
  showAsSubtle = false,
}: ClickableHeaderProps) => {
  return (
    <h1
      className={`clickable-header ${showAsSubtle ? "game-mode" : ""}`}
      onClick={onHeaderClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onHeaderClick();
        }
      }}
    >
      Jeopardy!
    </h1>
  );
};

export default ClickableHeader;
