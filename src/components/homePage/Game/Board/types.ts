import { CellValue } from "../../../../machines/ticTacToeMachine";

export interface BoardProps {
  board: CellValue[];
  onSquareClick: (index: number) => void;
}
