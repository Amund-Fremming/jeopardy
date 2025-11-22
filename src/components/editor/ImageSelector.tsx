import "./ImageSelector.css";

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  answer?: string;
  onAnswerChange?: (answer: string) => void;
}

/**
 * ImageSelector component - Text input for image URLs
 * Users can paste any image URL directly
 */
export default function ImageSelector({
  value,
  onChange,
  answer = "",
  onAnswerChange,
}: ImageSelectorProps) {
  return (
    <div className="image-selector">
      <label htmlFor="image-url" className="image-selector-label">
        Image URL
      </label>
      <input
        id="image-url"
        type="text"
        className="image-url-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <label
        htmlFor="image-answer"
        className="image-selector-label"
        style={{ marginTop: "var(--space-3)" }}
      >
        Correct Answer
      </label>
      <input
        id="image-answer"
        type="text"
        className="image-url-input"
        value={answer}
        onChange={(e) => onAnswerChange?.(e.target.value)}
        placeholder="Enter the correct answer..."
      />
    </div>
  );
}
