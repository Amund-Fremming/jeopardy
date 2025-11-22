import type { ReactNode } from "react";
import "./BoardGrid.css";

interface BoardGridProps {
  children: ReactNode;
}

/**
 * BoardGrid component for 6×5 layout (6 rows including category row, 5 columns)
 * Uses CSS Grid with responsive design
 */
export default function BoardGrid({ children }: BoardGridProps) {
  return <div className="board-grid">{children}</div>;
}
