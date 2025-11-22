/**
 * LocalStorage utilities for persisting board data and game state
 */

import type { BoardData, ScreenMode, Team } from "../types/board";

const STORAGE_KEY = "jeopardy-board-data";
const GAME_STATE_KEY = "jeopardy-game-state";

/**
 * Extended game state for persistence
 */
export interface GameState {
  screenMode: ScreenMode;
  teams: Team[];
  lastSaveTime: string;
  version: string;
}

/**
 * Save board data to localStorage
 */
export const saveBoardData = (data: BoardData): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save board data to localStorage:", error);
  }
};

/**
 * Load board data from localStorage
 * Returns null if no data exists or if parsing fails
 */
export const loadBoardData = (): BoardData | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized) as BoardData;
  } catch (error) {
    console.error("Failed to load board data from localStorage:", error);
    return null;
  }
};

/**
 * Save game state to localStorage
 */
export const saveGameState = (
  state: Omit<GameState, "lastSaveTime" | "version">
): void => {
  try {
    const fullState: GameState = {
      ...state,
      lastSaveTime: new Date().toISOString(),
      version: "1.0",
    };
    const serialized = JSON.stringify(fullState);
    localStorage.setItem(GAME_STATE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save game state to localStorage:", error);
  }
};

/**
 * Load game state from localStorage
 * Returns null if no data exists or if parsing fails
 */
export const loadGameState = (): GameState | null => {
  try {
    const serialized = localStorage.getItem(GAME_STATE_KEY);
    if (serialized === null) {
      return null;
    }
    const state = JSON.parse(serialized) as GameState;

    // Validate version compatibility
    if (state.version !== "1.0") {
      console.warn("Game state version mismatch. Clearing state.");
      localStorage.removeItem(GAME_STATE_KEY);
      return null;
    }

    return state;
  } catch (error) {
    console.error("Failed to load game state from localStorage:", error);
    return null;
  }
};

/**
 * Clear all persisted data from localStorage
 */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error("Failed to clear data from localStorage:", error);
  }
};

/**
 * Clear board data from localStorage (legacy function)
 */
export const clearBoardData = (): void => {
  clearAllData();
};
