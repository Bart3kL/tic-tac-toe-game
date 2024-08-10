import { CellValue } from "../../../../machines/TicTacToeMachine/types";

export interface BoardProps {
  board: CellValue[];
  onSquareClick: (index: number) => void;
  boardSize: number;
  currentPlayer: string;
  isSoundActive: boolean;
  isWinner: boolean;
}
