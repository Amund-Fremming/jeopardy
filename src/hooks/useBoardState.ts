/**
 * Custom hook for managing board state and screen mode
 */

import { useState, useEffect, useCallback } from "react";
import type {
  BoardData,
  Cell,
  CellType,
  SoundContent,
  ScreenMode,
} from "../types/board";
import { saveBoardData, loadBoardData } from "../utils/storage";

/**
 * Create initial empty board data
 */
const createInitialBoardData = (): BoardData => {
  const categories = Array(5)
    .fill(null)
    .map((_, index) => ({
      name: `Category ${index + 1}`,
      type: "text" as CellType,
    })) as [any, any, any, any, any];

  // Create 5x5 grid of cells
  const cells: Cell[][] = [];
  for (let row = 0; row < 5; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < 5; col++) {
      // Automatic value assignment: row index × $200
      // row 0 = $200, row 1 = $400, row 2 = $600, row 3 = $800, row 4 = $1000
      const value = (row + 1) * 200;

      rowCells.push({
        value,
        type: "text",
        content: "", // Empty string for text/image types
        isFlipped: false,
        isMarked: false,
      });
    }
    cells.push(rowCells);
  }

  return {
    categories,
    cells,
    numberOfTeams: 2,
    playerNames: [],
  };
};

/**
 * Initialize empty content based on cell type
 */
const getEmptyContent = (type: CellType): SoundContent | string => {
  if (type === "sound") {
    return {
      url: "",
      start: 0,
      end: 0,
    } as SoundContent;
  }
  return ""; // Empty string for image filename or text
};

export interface UseBoardStateReturn {
  boardData: BoardData;
  screenMode: ScreenMode;
  setBoardData: (data: BoardData) => void;
  setScreenMode: (mode: ScreenMode) => void;
  updateCategory: (index: number, name: string, type: CellType) => void;
  updateCell: (row: number, col: number, updates: Partial<Cell>) => void;
  resetCell: (row: number, col: number) => void;
  updateTeamConfig: (numberOfTeams: number, playerNames: string[]) => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

/**
 * Custom hook for board state management
 */
export const useBoardState = (): UseBoardStateReturn => {
  // Initialize board data from localStorage or create new
  const [boardData, setBoardData] = useState<BoardData>(() => {
    const loaded = loadBoardData();
    return loaded || createInitialBoardData();
  });

  // Screen mode defaults to Editor
  const [screenMode, setScreenMode] = useState<ScreenMode>("editor");

  // Auto-save to localStorage when board data changes
  useEffect(() => {
    saveBoardData(boardData);
  }, [boardData]);

  /**
   * Update a category
   */
  const updateCategory = useCallback(
    (index: number, name: string, type: CellType) => {
      setBoardData((prev) => {
        const newCategories = [...prev.categories];
        newCategories[index] = { name, type };

        // When category type changes, update all cells in that column with empty content
        const newCells = prev.cells.map((row) => {
          const newRow = [...row];
          newRow[index] = {
            ...newRow[index],
            type,
            content: getEmptyContent(type),
          };
          return newRow;
        });

        return {
          ...prev,
          categories: newCategories as [any, any, any, any, any],
          cells: newCells,
        };
      });
    },
    []
  );

  /**
   * Update a specific cell
   */
  const updateCell = useCallback(
    (row: number, col: number, updates: Partial<Cell>) => {
      setBoardData((prev) => {
        const newCells = prev.cells.map((r, rowIndex) => {
          if (rowIndex === row) {
            return r.map((cell, colIndex) => {
              if (colIndex === col) {
                return { ...cell, ...updates };
              }
              return cell;
            });
          }
          return r;
        });

        return {
          ...prev,
          cells: newCells,
        };
      });
    },
    []
  );

  /**
   * Reset a cell to unflipped state
   */
  const resetCell = useCallback(
    (row: number, col: number) => {
      updateCell(row, col, { isFlipped: false, isMarked: false });
    },
    [updateCell]
  );

  /**
   * Update team configuration
   */
  const updateTeamConfig = useCallback(
    (numberOfTeams: number, playerNames: string[]) => {
      setBoardData((prev) => ({
        ...prev,
        numberOfTeams,
        playerNames,
      }));
    },
    []
  );

  /**
   * Manually save to storage
   */
  const saveToStorage = useCallback(() => {
    saveBoardData(boardData);
  }, [boardData]);

  /**
   * Manually load from storage
   */
  const loadFromStorage = useCallback(() => {
    const loaded = loadBoardData();
    if (loaded) {
      setBoardData(loaded);
    }
  }, []);

  return {
    boardData,
    screenMode,
    setBoardData,
    setScreenMode,
    updateCategory,
    updateCell,
    resetCell,
    updateTeamConfig,
    saveToStorage,
    loadFromStorage,
  };
};
