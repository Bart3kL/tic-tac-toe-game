export interface FormProps {
  startGame: (type: string, playerInfo: string[]) => void;
  isSoundActive: boolean;
  formStep: number;
  setFormStep: (step: number) => void;
  setBoardSize: (size: number) => void;
}
