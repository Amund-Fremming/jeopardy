/**
 * Integration Example: Full Editor Component Integration
 *
 * This demonstrates how all editor components work together:
 * - CategoryCell with CategoryInput and TypeSelector
 * - ContentInput with SoundInput, ImageSelector, and TextInput
 * - Integration with useBoardState hook
 */

import { useBoardState } from "../../hooks/useBoardState";
import CategoryCell from "../CategoryCell";
import ContentInput from "./ContentInput";
import type { Category } from "../../types/board";

/**
 * Example usage in an Editor Screen component
 */
export default function EditorExample() {
  const { boardData, updateCategory, updateCell } = useBoardState();

  return (
    <div style={{ padding: "20px" }}>
      {/* Category Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {boardData.categories.map((category: Category, index: number) => (
          <CategoryCell
            key={index}
            name={category.name}
            type={category.type}
            onNameChange={(name: string) =>
              updateCategory(index, name, category.type)
            }
            onTypeChange={(type) => updateCategory(index, category.name, type)}
          />
        ))}
      </div>

      {/* Content Cells Grid (5x5) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
        }}
      >
        {boardData.cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                padding: "1rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                ${cell.value}
              </div>
              <ContentInput
                type={cell.type}
                content={cell.content}
                onChange={(newContent) =>
                  updateCell(rowIndex, colIndex, { content: newContent })
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * How it works:
 *
 * 1. CATEGORY MANAGEMENT:
 *    - CategoryCell receives name and type from boardData.categories
 *    - CategoryInput handles text input for category name
 *    - TypeSelector handles dropdown for content type
 *    - updateCategory(index, name, type) updates category and propagates type to all cells in column
 *
 * 2. CONTENT INPUT SWITCHING:
 *    - ContentInput receives type prop from cell.type
 *    - Based on type, renders one of:
 *      * SoundInput (for type="sound") - YouTube URL + timestamps
 *      * ImageSelector (for type="image") - Dropdown from imageManifest
 *      * TextInput (for type="text") - Multiline textarea
 *
 * 3. CONTENT VALIDATION:
 *    - SoundInput validates:
 *      * YouTube URL format (youtube.com/watch?v=, youtu.be/, m.youtube.com/watch?v=)
 *      * Start/end timestamps are non-negative numbers
 *      * Start < end
 *    - ImageSelector validates selection from available images
 *    - TextInput accepts any text content
 *
 * 4. STATE FLOW:
 *    useBoardState → boardData → Components → user input → updateCell/updateCategory → state update
 *
 * 5. TYPE PROPAGATION:
 *    When category type changes via TypeSelector:
 *    - updateCategory is called
 *    - useBoardState automatically updates all 5 cells in that column
 *    - Each cell's content is reset to empty state for new type
 *    - ContentInput re-renders with new type, showing appropriate input
 */
