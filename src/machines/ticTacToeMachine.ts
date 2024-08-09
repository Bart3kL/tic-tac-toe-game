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
    };

const defaultContext = {
  grid: Array(9).fill(null) as CellValue[],
  currentPlayer: "x" as PlayerType,
  winningPlayer: undefined as PlayerType | undefined,
  gameType: "" as string,
  usernames: [] as string[],
};

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
        ...defaultContext,
        currentPlayer: "x",
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
      }),
    },
    guards: {
      hasWinner: ({ context: { grid } }) => {
        const winningPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

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
