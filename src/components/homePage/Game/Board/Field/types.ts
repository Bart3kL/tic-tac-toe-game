import { CellValue } from "../../../../../machines/TicTacToeMachine/types";

export interface FieldProps {
  value: CellValue;
  onClick: () => void;
}
