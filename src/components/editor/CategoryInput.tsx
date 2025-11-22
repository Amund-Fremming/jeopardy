import "./CategoryInput.css";

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * CategoryInput component - Text input for category name
 * Styled with orange theme for Editor screen
 */
export default function CategoryInput({
  value,
  onChange,
  placeholder = "Category name",
}: CategoryInputProps) {
  return (
    <input
      type="text"
      className="category-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
