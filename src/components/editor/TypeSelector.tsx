import type { CellType } from "../../types/board";
import "./TypeSelector.css";

interface TypeSelectorProps {
  value: CellType;
  onChange: (type: CellType) => void;
}

/**
 * TypeSelector component - Dropdown for selecting content type
 * Options: sound, image, text
 * Styled with orange theme for Editor screen
 */
export default function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <select
      className="type-selector"
      value={value}
      onChange={(e) => onChange(e.target.value as CellType)}
    >
      <option value="text">Text</option>
      <option value="image">Image</option>
      <option value="sound">Sound</option>
    </select>
  );
}
