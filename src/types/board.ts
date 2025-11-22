/**
 * TypeScript interfaces for the Jeopardy board data structure
 */

/**
 * Content type for sound/audio clues
 */
export interface SoundContent {
  url: string; // YouTube URL
  start: number; // Start time in seconds
  end: number; // End time in seconds
}

/**
 * Cell type enum
 */
export type CellType = "sound" | "image" | "text";

/**
 * Individual cell in the game board
 */
export interface Cell {
  value: number; // Dollar value: $200-$1000
  type: CellType;
  content: SoundContent | string; // SoundContent for sound, string for image filename or text
  answer?: string; // The correct answer for this clue
  isFlipped?: boolean; // Track if cell is flipped in game mode
  isRevealed?: boolean; // Track if answer is revealed in game mode
  isMarked?: boolean; // Track if cell is marked with X in game mode
}

/**
 * Category header data
 */
export interface Category {
  name: string;
  type: CellType;
}

/**
 * Complete board data structure
 */
export interface BoardData {
  categories: [Category, Category, Category, Category, Category]; // Exactly 5 categories
  cells: Cell[][]; // 5x5 grid of cells
  numberOfTeams: number; // Number of teams playing
  playerNames: string[]; // List of player names (one per line from textarea)
}

/**
 * Team data structure for game play
 */
export interface Team {
  teamNumber: number; // 1-indexed team number
  players: string[]; // Array of player names assigned to this team
  score: number; // Current team score
}

/**
 * Screen mode
 */
export type ScreenMode = "editor" | "teamAssignment" | "game" | "finalScore";
