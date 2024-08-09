import { CellValue } from "../../../../../machines/ticTacToeMachine";

export interface FieldProps {
  value: CellValue;
  onClick: () => void;
}
