import { SoundManagerEventProps } from "../../../machines/SoundManagerMachine/types";

export interface SoundsManagerProps {
  send: (event: SoundManagerEventProps) => void;
  isSoundActive: boolean;
  isMusicActive: boolean;
}
