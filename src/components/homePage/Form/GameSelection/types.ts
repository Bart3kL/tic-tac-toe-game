export interface GameSelectionProps {
  setStep: (step: number) => void;
  setPlayers: (num: number) => void;
  setGameType: (type: string) => void;
  isSoundActive: boolean;
  playSound: () => void;
}
