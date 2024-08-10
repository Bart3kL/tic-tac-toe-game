import { StateFrom } from "xstate";

import { ticTacToeMachine } from ".";
import { GameEvent } from "./constants";

export type PlayerType = "x" | "o";

export type CellValue = PlayerType | null;

export type TicTacToeEvent =
  | { type: typeof GameEvent.PLAY_MOVE; position: number }
  | { type: typeof GameEvent.RESET }
  | {
      type: typeof GameEvent.SETUP_GAME;
      gameType: string;
      usernames: string[];
      boardSize: number;
    };

export type TicTacToeState = StateFrom<typeof ticTacToeMachine>;
