import { createMachine, assign } from "xstate";
import { SoundEvent, SoundState } from "./constants";
import { SoundManagerEvent, OnOffType } from "./types";

// Define the default context for the machine
const defaultContext = {
  isSoundOn: false as OnOffType,
  isMusicOn: false as OnOffType,
};

export const soundManagerMachine = createMachine(
  {
    id: "soundManagerMachine",
    initial: SoundState.BOTH_ON,
    types: {} as {
      context: typeof defaultContext;
      events: SoundManagerEvent;
    },
    context: defaultContext,
    states: {
      [SoundState.BOTH_ON]: {
        on: {
          [SoundEvent.TOGGLE_SOUND]: {
            target: SoundState.SOUND_OFF_MUSIC_ON,
            actions: "toggleSound",
          },
          [SoundEvent.TOGGLE_MUSIC]: {
            target: SoundState.SOUND_ON_MUSIC_OFF,
            actions: "toggleMusic",
          },
        },
      },
      [SoundState.SOUND_OFF_MUSIC_ON]: {
        on: {
          [SoundEvent.TOGGLE_SOUND]: {
            target: SoundState.BOTH_ON,
            actions: "toggleSound",
          },
          [SoundEvent.TOGGLE_MUSIC]: {
            target: SoundState.BOTH_OFF,
            actions: "toggleMusic",
          },
        },
      },
      [SoundState.SOUND_ON_MUSIC_OFF]: {
        on: {
          [SoundEvent.TOGGLE_SOUND]: {
            target: SoundState.BOTH_OFF,
            actions: "toggleSound",
          },
          [SoundEvent.TOGGLE_MUSIC]: {
            target: SoundState.BOTH_ON,
            actions: "toggleMusic",
          },
        },
      },
      [SoundState.BOTH_OFF]: {
        on: {
          [SoundEvent.TOGGLE_SOUND]: {
            target: SoundState.SOUND_ON_MUSIC_OFF,
            actions: "toggleSound",
          },

          [SoundEvent.TOGGLE_MUSIC]: {
            target: SoundState.SOUND_OFF_MUSIC_ON,
            actions: "toggleMusic",
          },
        },
      },
    },
  },
  {
    actions: {
      // Toggle the sound state in the context
      toggleSound: assign({
        isSoundOn: ({ context: { isSoundOn } }) => !isSoundOn,
      }),
      // Toggle the music state in the context
      toggleMusic: assign({
        isMusicOn: ({ context: { isMusicOn } }) => !isMusicOn,
      }),
    },
  },
);
