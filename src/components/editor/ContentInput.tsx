import type { CellType, SoundContent } from "../../types/board";
import SoundInput from "./SoundInput";
import ImageSelector from "./ImageSelector";
import TextInput from "./TextInput";
import "./ContentInput.css";

interface ContentInputProps {
  type: CellType;
  content: SoundContent | string;
  onChange: (content: SoundContent | string) => void;
}

/**
 * ContentInput component - Wrapper that renders the appropriate input based on type
 * Switches between SoundInput, ImageSelector, and TextInput based on the category type
 */
export default function ContentInput({
  type,
  content,
  onChange,
}: ContentInputProps) {
  /**
   * Type guard to check if content is SoundContent
   */
  const isSoundContent = (
    content: SoundContent | string
  ): content is SoundContent => {
    return typeof content === "object" && "url" in content;
  };

  /**
   * Render the appropriate input component based on type
   */
  const renderInput = () => {
    switch (type) {
      case "sound":
        // Ensure content is SoundContent type
        const soundContent = isSoundContent(content)
          ? content
          : { url: "", start: 0, end: 0 };

        return (
          <SoundInput
            value={soundContent}
            onChange={(newContent) => onChange(newContent)}
          />
        );

      case "image":
        // Ensure content is string type
        const imageContent = typeof content === "string" ? content : "";

        return (
          <ImageSelector
            value={imageContent}
            onChange={(newContent) => onChange(newContent)}
          />
        );

      case "text":
        // Ensure content is string type
        const textContent = typeof content === "string" ? content : "";

        return (
          <TextInput
            value={textContent}
            onChange={(newContent) => onChange(newContent)}
          />
        );

      default:
        return (
          <div className="content-input-error">
            Unknown content type: {type}
          </div>
        );
    }
  };

  return <div className="content-input">{renderInput()}</div>;
}
