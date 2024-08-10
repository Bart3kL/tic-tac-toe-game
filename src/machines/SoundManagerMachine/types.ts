import { StateFrom, EventFrom } from "xstate";

import { SoundEvent } from "./constants";
import { soundManagerMachine } from ".";

export type OnOffType = boolean;

export type SoundManagerEvent =
  | { type: typeof SoundEvent.TOGGLE_SOUND }
  | { type: typeof SoundEvent.TOGGLE_MUSIC };

export type SoundManagerState = StateFrom<typeof soundManagerMachine>;
export type SoundManagerEventProps = EventFrom<typeof soundManagerMachine>;
