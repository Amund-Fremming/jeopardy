import "./ImageSelector.css";

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * ImageSelector component - Text input for image URLs
 * Users can paste any image URL directly
 */
export default function ImageSelector({ value, onChange }: ImageSelectorProps) {
  return (
    <div className="image-selector">
      <label htmlFor="image-url" className="image-selector-label">
        Image URL
      </label>
      <input
        id="image-url"
        type="text"
        className="image-selector-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter image URL..."
      />
    </div>
  );
}
