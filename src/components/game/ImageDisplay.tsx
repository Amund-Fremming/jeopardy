import { useState } from "react";
import "./ImageDisplay.css";

interface ImageDisplayProps {
  filename: string;
}

/**
 * ImageDisplay Component
 * Displays images from any URL
 * Handles missing images gracefully with error state
 */
export default function ImageDisplay({ filename }: ImageDisplayProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Show error if URL is missing or failed to load
  if (hasError || !filename) {
    return (
      <div className="image-display-error">
        <div className="error-icon">🖼️</div>
        <div className="error-message">Image not found</div>
        <div className="error-details">{filename || "No URL provided"}</div>
      </div>
    );
  }

  return (
    <div className="image-display">
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      <img
        src={filename}
        alt="Jeopardy clue"
        className={`display-image ${isLoading ? "hidden" : ""}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
