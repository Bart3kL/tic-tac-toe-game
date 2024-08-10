import { createMachine, assign } from "xstate";
import { TicTacToeEvent } from "./types";
import { GameConfigEvent, GameState } from "./constants";

// Default context initialization
export const defaultContext = {
  usernames: [] as string[],
  boardSize: 3,
  gameType: "",
  players: 1,
  gameStarted: false,
  formState: 1,
};

export const ticTacToeConfigMachine = createMachine(
  {
    id: "ticTacToeConfigMachine",
    initial: GameState.READY,
    context: defaultContext,
    schemas: {
      context: {} as typeof defaultContext,
      events: {} as TicTacToeEvent,
    },
    states: {
      [GameState.READY]: {
        on: {
          [GameConfigEvent.SET_BOARD_SIZE]: {
            actions: "setBoardSize",
          },
          [GameConfigEvent.SET_USERNAMES]: {
            actions: "setUsernames",
          },
          [GameConfigEvent.SET_GAME_TYPE]: {
            actions: "setGameType",
          },
          [GameConfigEvent.SET_PLAYERS]: {
            actions: "setPlayers",
          },
          [GameConfigEvent.SET_FORM_STATE]: {
            actions: "setFormState",
          },
          [GameConfigEvent.START_GAME]: {
            target: GameState.IN_PROGRESS,
            actions: "startGame",
          },
          [GameConfigEvent.RESET]: {
            actions: "resetGame",
          },
        },
      },
      [GameState.IN_PROGRESS]: {
        on: {
          [GameConfigEvent.RESET]: {
            target: GameState.READY,
            actions: "resetGame",
          },
        },
      },
    },
  },
  {
    actions: {
      // Assign the new board size to context
      setBoardSize: assign({
        boardSize: ({ context, event }) => {
          if (event.type !== GameConfigEvent.SET_BOARD_SIZE)
            return context.boardSize;
          return event.boardSize;
        },
      }),
      // Assign the new usernames to context
      setUsernames: assign({
        usernames: ({ context, event }) => {
          if (event.type !== GameConfigEvent.SET_USERNAMES)
            return context.usernames;
          return event.usernames;
        },
      }),
      // Assign the new game type to context
      setGameType: assign({
        gameType: ({ context, event }) => {
          if (event.type !== GameConfigEvent.SET_GAME_TYPE)
            return context.gameType;
          return event.gameType;
        },
      }),
      // Assign the new players count to context
      setPlayers: assign({
        players: ({ context, event }) => {
          if (event.type !== GameConfigEvent.SET_PLAYERS)
            return context.players;
          return event.players;
        },
      }),
      // Assign the new form state to context
      setFormState: assign({
        formState: ({ context, event }) => {
          if (event.type !== GameConfigEvent.SET_FORM_STATE)
            return context.formState;
          return event.formState;
        },
      }),
      // Mark the game as started
      startGame: assign({
        gameStarted: true,
      }),
      // Reset the context to its default values
      resetGame: assign(() => defaultContext),
    },
  },
);

export { GameConfigEvent, GameState };
