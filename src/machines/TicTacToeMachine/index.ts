import { createMachine, assign } from "xstate";

import { getWinningPatterns } from "./utils";
import { GameState, GameEvent } from "./constants";
import { PlayerType, CellValue, TicTacToeEvent } from "./types";

// Default context initialization
const defaultContext = {
  grid: Array(9).fill(null) as CellValue[],
  currentPlayer: "x" as PlayerType,
  winningPlayer: undefined as PlayerType | undefined,
  gameType: "" as string,
  usernames: [] as string[],
  boardSize: 3,
};

// Function to resize the grid based on the specified size
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
      // Apply the player's move to the grid and switch to the next player
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
      // Restart the game to its default settings
      restartGame: assign({
        grid: resizeGrid(defaultContext.boardSize),
        currentPlayer: "x",
        winningPlayer: undefined,
        gameType: "",
        usernames: [],
        boardSize: 3,
      }),
      // Declare the winner by setting the winning player
      declareWinner: assign({
        winningPlayer: ({ context }) =>
          context.currentPlayer === "x" ? "o" : "x",
      }),
      // Setup game context based on the provided event values
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
      // Check if there is a winning pattern on the grid
      hasWinner: ({ context: { grid, boardSize } }) => {
        // Function to find winning patterns for 3 consecutive identical symbols in a grid
        const winningPatterns = getWinningPatterns(boardSize);

        // Check if any pattern is met
        return winningPatterns.some((pattern) =>
          pattern.every(
            (pos) => grid[pos] !== null && grid[pos] === grid[pattern[0]],
          ),
        );
      },
      // Check if the grid is full without any winner
      isDraw: ({ context: { grid } }) => grid.every((cell) => cell !== null),
      // Validate if the move is legal (position is not already occupied)
      moveIsValid: ({ context: { grid }, event }) => {
        if (event.type !== GameEvent.PLAY_MOVE) return false;
        return grid[event.position] === null;
      },
    },
  },
);
