import { createMachine, assign, StateFrom } from "xstate";

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

type PlayerType = "x" | "o";

export type CellValue = PlayerType | null;

export type TicTacToeEvent =
  | { type: typeof GameEvent.PLAY_MOVE; position: number }
  | { type: typeof GameEvent.RESET }
  | {
      type: typeof GameEvent.SETUP_GAME;
      gameType: string;
      usernames: string[];
      boardSize: number; // Dodaj to
    };

const defaultContext = {
  grid: Array(9).fill(null) as CellValue[],
  currentPlayer: "x" as PlayerType,
  winningPlayer: undefined as PlayerType | undefined,
  gameType: "" as string,
  usernames: [] as string[],
  boardSize: 3, // Dodaj to domyślne ustawienie
};

const resizeGrid = (size: number): CellValue[] => Array(size * size).fill(null);

export const ticTacToeMachine = createMachine(
  {
    id: "ticTacToeMachine",
    initial: GameState.IN_PROGRESS,
    types: {} as {
      context: typeof defaultContext;
      events: TicTacToeEvent;
    },
    context: defaultContext,
    states: {
      [GameState.IN_PROGRESS]: {
        always: [
          {
            target: GameState.VICTORY,
            guard: "hasWinner",
            actions: "declareWinner",
          },
          { target: GameState.DRAW, guard: "isDraw" },
        ],
        on: {
          [GameEvent.PLAY_MOVE]: {
            target: GameState.IN_PROGRESS,
            guard: "moveIsValid",
            actions: "applyMove",
          },
        },
      },
      [GameState.VICTORY]: {},
      [GameState.DRAW]: {},
    },
    on: {
      [GameEvent.RESET]: {
        target: `.${GameState.IN_PROGRESS}`,
        actions: "restartGame",
      },
      [GameEvent.SETUP_GAME]: {
        target: `.${GameState.IN_PROGRESS}`,
        actions: "setupGame",
      },
    },
  },
  {
    actions: {
      applyMove: assign({
        grid: ({ context, event }) => {
          if (event.type !== GameEvent.PLAY_MOVE) return context.grid;

          const newGrid = [...context.grid];
          newGrid[event.position] = context.currentPlayer;

          return newGrid;
        },
        currentPlayer: ({ context }) =>
          context.currentPlayer === "x" ? "o" : "x",
      }),
      restartGame: assign({
        grid: resizeGrid(defaultContext.boardSize), // Upewnij się, że restart gry resetuje planszę do ustawionego rozmiaru
        currentPlayer: "x",
        winningPlayer: undefined,
        gameType: "",
        usernames: [],
        boardSize: 3, // Zresetuj również boardSize do domyślnego ustawienia
      }),
      declareWinner: assign({
        winningPlayer: ({ context }) =>
          context.currentPlayer === "x" ? "o" : "x",
      }),
      setupGame: assign({
        gameType: ({ event }) => {
          if (event.type !== GameEvent.SETUP_GAME) return "";
          return event.gameType;
        },
        usernames: ({ event }) => {
          if (event.type !== GameEvent.SETUP_GAME) return [];
          return event.usernames;
        },
        boardSize: ({ event }) => {
          if (event.type !== GameEvent.SETUP_GAME) return 3;
          return event.boardSize;
        },
        grid: ({ event }) => {
          if (event.type !== GameEvent.SETUP_GAME) return resizeGrid(3);
          return resizeGrid(event.boardSize);
        },
      }),
    },
    guards: {
      hasWinner: ({ context: { grid, boardSize } }) => {
        // Function to find winning patterns for 3 consecutive identical symbols in a grid
        const getWinningPatterns = (size: number) => {
          const patterns: number[][] = [];

          // Horizontal and Vertical
          for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - 3; j++) {
              // Horizontal
              patterns.push([i * size + j, i * size + j + 1, i * size + j + 2]);
              // Vertical
              patterns.push([
                j * size + i,
                (j + 1) * size + i,
                (j + 2) * size + i,
              ]);
            }
          }

          // Diagonal (both directions)
          for (let i = 0; i <= size - 3; i++) {
            for (let j = 0; j <= size - 3; j++) {
              // Top-left to bottom-right
              patterns.push([
                i * size + j,
                (i + 1) * size + j + 1,
                (i + 2) * size + j + 2,
              ]);
              // Bottom-left to top-right
              patterns.push([
                (i + 2) * size + j,
                (i + 1) * size + j + 1,
                i * size + j + 2,
              ]);
            }
          }

          return patterns;
        };

        const winningPatterns = getWinningPatterns(boardSize);

        return winningPatterns.some((pattern) =>
          pattern.every(
            (pos) => grid[pos] !== null && grid[pos] === grid[pattern[0]],
          ),
        );
      },
      isDraw: ({ context: { grid } }) => grid.every((cell) => cell !== null),
      moveIsValid: ({ context: { grid }, event }) => {
        if (event.type !== GameEvent.PLAY_MOVE) return false;
        return grid[event.position] === null;
      },
    },
  },
);
export type TicTacToeState = StateFrom<typeof ticTacToeMachine>;

export default ticTacToeMachine;
