import { createMachine, assign } from "xstate";

export const SoundState = {
  BOTH_ON: "BOTH_ON",
  SOUND_OFF_MUSIC_ON: "SOUND_OFF_MUSIC_ON",
  SOUND_ON_MUSIC_OFF: "SOUND_ON_MUSIC_OFF",
  BOTH_OFF: "BOTH_OFF",
} as const;

export const SoundEvent = {
  TOGGLE_SOUND: "TOGGLE_SOUND",
  TOGGLE_MUSIC: "TOGGLE_MUSIC",
} as const;

type OnOffType = boolean;

export type SoundManagerEvent =
  | { type: typeof SoundEvent.TOGGLE_SOUND }
  | { type: typeof SoundEvent.TOGGLE_MUSIC };

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
      toggleSound: assign({
        isSoundOn: ({ context: { isSoundOn } }) => !isSoundOn,
      }),
      toggleMusic: assign({
        isMusicOn: ({ context: { isMusicOn } }) => !isMusicOn,
      }),
    },
  },
);

export default soundManagerMachine;
