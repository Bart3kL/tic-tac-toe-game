export interface UsernamesProps {
  players: number;
  // startGame: (playerInfo: { nick1: string; nick2: string }) => void;
  playSound: () => void;
  isSoundActive: boolean;
  setStep: (step: number) => void;
  nick1: string;
  nick2: string;
  setNick1: (nick: string) => void;
  setNick2: (nick: string) => void;
}
