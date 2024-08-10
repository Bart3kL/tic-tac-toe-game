export const GameState = {
  DRAW: "DRAW",
  IN_PROGRESS: "IN_PROGRESS",
  VICTORY: "VICTORY",
} as const;

export const GameEvent = {
  PLAY_MOVE: "PLAY_MOVE",
  RESET: "RESET",
  SETUP_GAME: "SETUP_GAME",
} as const;
