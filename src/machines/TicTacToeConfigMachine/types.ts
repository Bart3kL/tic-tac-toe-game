import { StateFrom, EventFrom } from "xstate";

import { ticTacToeConfigMachine } from "./";
import { GameConfigEvent } from "./constants";

export type TicTacToeEvent =
  | { type: typeof GameConfigEvent.SET_BOARD_SIZE; boardSize: number }
  | { type: typeof GameConfigEvent.SET_USERNAMES; usernames: string[] }
  | { type: typeof GameConfigEvent.SET_GAME_TYPE; gameType: string }
  | { type: typeof GameConfigEvent.SET_PLAYERS; players: number }
  | { type: typeof GameConfigEvent.SET_FORM_STATE; formState: number }
  | { type: typeof GameConfigEvent.START_GAME }
  | { type: typeof GameConfigEvent.RESET };

export type TicTacToeState = StateFrom<typeof ticTacToeConfigMachine>;
export type TicTacToeEventProps = EventFrom<typeof ticTacToeConfigMachine>;
