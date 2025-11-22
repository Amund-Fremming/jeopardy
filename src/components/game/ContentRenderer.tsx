import type { Cell, SoundContent } from "../../types/board";
import SoundPlayer from "./SoundPlayer";
import ImageDisplay from "./ImageDisplay";
import TextDisplay from "./TextDisplay";

interface ContentRendererProps {
  cell: Cell;
}

/**
 * ContentRenderer Component
 * Switches between different content types (sound/image/text)
 * Renders the appropriate display component based on cell type
 */
export default function ContentRenderer({ cell }: ContentRendererProps) {
  switch (cell.type) {
    case "sound":
      // Type guard: ensure content is SoundContent
      if (typeof cell.content === "object" && "url" in cell.content) {
        return <SoundPlayer content={cell.content as SoundContent} />;
      }
      // Fallback for invalid sound content
      return (
        <div
          style={{
            color: "var(--color-error)",
            padding: "var(--space-4)",
            textAlign: "center",
          }}
        >
          Invalid sound content
        </div>
      );

    case "image":
      // Type guard: ensure content is string
      if (typeof cell.content === "string") {
        return <ImageDisplay filename={cell.content} />;
      }
      // Fallback for invalid image content
      return (
        <div
          style={{
            color: "var(--color-error)",
            padding: "var(--space-4)",
            textAlign: "center",
          }}
        >
          Invalid image content
        </div>
      );

    case "text":
      // Type guard: ensure content is string
      if (typeof cell.content === "string") {
        return <TextDisplay text={cell.content} />;
      }
      // Fallback for invalid text content
      return (
        <div
          style={{
            color: "var(--color-error)",
            padding: "var(--space-4)",
            textAlign: "center",
          }}
        >
          Invalid text content
        </div>
      );

    default:
      // Fallback for unknown type
      return (
        <div
          style={{
            color: "var(--color-error)",
            padding: "var(--space-4)",
            textAlign: "center",
          }}
        >
          Unknown content type
        </div>
      );
  }
}
