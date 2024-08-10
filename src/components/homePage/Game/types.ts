import {
  CellValue,
  TicTacToeEvent,
  PlayerType,
  TicTacToeState,
} from "../../../machines/TicTacToeMachine/types";
import { TicTacToeEventProps } from "../../../machines/TicTacToeConfigMachine/types";

export interface GameProps {
  send: (event: TicTacToeEvent) => void;
  grid: CellValue[];
  currentPlayer: PlayerType;
  winningPlayer: PlayerType | undefined;
  gameType: string;
  usernames: string[];
  ticTacToeState: TicTacToeState;
  setStart: (start: boolean) => void;
  setFormStep: () => void;
  boardSize: number;
  isSoundActive: boolean;
  ticTacToeConfigSend: (event: TicTacToeEventProps) => void;
}
