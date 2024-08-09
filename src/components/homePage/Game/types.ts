import {
  CellValue,
  GameEvent,
  TicTacToeState,
} from "../../../machines/ticTacToeMachine";

type PlayMoveEvent = {
  type: typeof GameEvent.PLAY_MOVE;
  position: number;
};

type ResetEvent = {
  type: typeof GameEvent.RESET;
};

type SetupGameEvent = {
  type: typeof GameEvent.SETUP_GAME;
  gameType: string;
  usernames: string[];
};

export interface GameProps {
  send: (event: PlayMoveEvent | ResetEvent | SetupGameEvent) => void;
  grid: CellValue[];
  currentPlayer: string;
  winningPlayer: string | undefined;
  gameType: string;
  usernames: string[];
  ticTacToeState: TicTacToeState; // używamy określonego typu dla maszyny stanowej
  setStart: (start: boolean) => void;
  setFormStep: (step: number) => void;
}
