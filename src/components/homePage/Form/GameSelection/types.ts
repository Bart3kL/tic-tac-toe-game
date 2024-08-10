export interface GameSelectionProps {
  setStep: () => void;
  setPlayers: (num: number) => void;
  setGameType: (type: string) => void;
  isSoundActive: boolean;
  playSound: () => void;
}
