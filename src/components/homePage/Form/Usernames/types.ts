export interface UsernamesProps {
  players: number;
  startGame: (playerInfo: { nick1: string; nick2: string }) => void;
  playSound: () => void;
  isSoundActive: boolean;
}
