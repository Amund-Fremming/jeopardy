import type { CellType } from "../types/board";
import CategoryInput from "./editor/CategoryInput";
import TypeSelector from "./editor/TypeSelector";
import "./CategoryCell.css";

interface CategoryCellProps {
  name: string;
  type: CellType;
  onNameChange: (name: string) => void;
  onTypeChange: (type: CellType) => void;
}

/**
 * CategoryCell component for Editor screen
 * Combines CategoryInput and TypeSelector in an orange-styled container
 * Orchestrates category name and type controls
 */
export default function CategoryCell({
  name,
  type,
  onNameChange,
  onTypeChange,
}: CategoryCellProps) {
  return (
    <div className="category-cell">
      <CategoryInput value={name} onChange={onNameChange} />
      <TypeSelector value={type} onChange={onTypeChange} />
    </div>
  );
}
