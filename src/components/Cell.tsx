import type { ReactNode } from "react";
import "./Cell.css";

interface CellProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Base reusable cell component with border, radius, and hover states
 */
export default function Cell({ children, className = "", onClick }: CellProps) {
  return (
    <div className={`cell ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
