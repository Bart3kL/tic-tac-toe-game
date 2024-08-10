export interface UsernamesProps {
  players: number;
  playSound: () => void;
  isSoundActive: boolean;
  setStep: () => void;
  nick1: string;
  nick2: string;
  setNick1: (nick: string) => void;
  setNick2: (nick: string) => void;
}
