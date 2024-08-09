import React from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import useSound from "../../../hooks/useSound";
import clickSound from "../../../assets/click.mp3";
import music from "../../../assets/music.mp3";

import { SoundsManagerProps } from "./types";

import { SoundsWrapper, Button } from "./styles";

import { SoundEvent } from "../../../machines/soundManagerMachine";

export const SoundsManager: React.FC<SoundsManagerProps> = ({
  send,
  isSoundActive,
  isMusicActive,
}) => {
  const { playSound } = useSound(clickSound);
  const { playSound: playMusic, stopSound: stopMusic } = useSound(music, true);

  return (
    <SoundsWrapper>
      <Button
        onClick={() => {
          send({ type: SoundEvent.TOGGLE_SOUND });
          isSoundActive && playSound();
        }}
      >
        {isSoundActive ? (
          <HiMiniSpeakerWave />
        ) : (
          <HiMiniSpeakerXMark color="red" />
        )}
      </Button>
      <Button
        onClick={() => {
          send({ type: SoundEvent.TOGGLE_MUSIC });
          isSoundActive && playSound();
          if (!isMusicActive) {
            playMusic();

            return;
          }
          stopMusic();
        }}
      >
        {isMusicActive ? <MdMusicNote /> : <MdMusicOff color="red" />}
      </Button>
    </SoundsWrapper>
  );
};
