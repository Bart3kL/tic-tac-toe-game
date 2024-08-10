import { TicTacToeEventProps } from "../machines/TicTacToeConfigMachine/types";

export interface UseFormProps {
  players: number;
  usernames: string[];
  ticTacToeConfigSend: (event: TicTacToeEventProps) => void;
  isSoundActive: boolean;
  playSound: () => void;
}
