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
