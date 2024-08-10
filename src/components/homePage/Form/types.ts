import {
  TicTacToeEventProps,
  TicTacToeState,
} from "../../../machines/TicTacToeConfigMachine/types";

export interface FormProps {
  isSoundActive: boolean;
  formStep: number;
  ticTacToeConfigState: TicTacToeState;
  ticTacToeConfigSend: (event: TicTacToeEventProps) => void;
}
