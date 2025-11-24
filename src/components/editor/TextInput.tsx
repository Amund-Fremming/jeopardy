import "./TextInput.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * TextInput component - Multiline textarea for text content
 * Minimum 2 rows, auto-expands with content
 */
export default function TextInput({
  value,
  onChange,
  placeholder = "Enter your clue text here...",
}: TextInputProps) {
  return (
    <div className="text-input">
      <label htmlFor="text-content" className="text-input-label">
        Text Content
      </label>
      <textarea
        id="text-content"
        className="text-input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );
}
