import React from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import { useSound } from "../../../hooks/useSound";
import { SoundEvent } from "../../../machines/SoundManagerMachine/constants";
import clickSound from "../../../assets/click.mp3";
import music from "../../../assets/music.mp3";

import { SoundsManagerProps } from "./types";
import { SoundsWrapper, Button } from "./styles";

export const SoundsManager: React.FC<SoundsManagerProps> = ({
  send,
  isSoundActive,
  isMusicActive,
}) => {
  const { playSound: playClickSound } = useSound(clickSound);
  const { playSound: playMusic, stopSound: stopMusic } = useSound(music, true);

  const handleSoundToggle = () => {
    send({ type: SoundEvent.TOGGLE_SOUND });
    if (isSoundActive) playClickSound();
  };

  const handleMusicToggle = () => {
    send({ type: SoundEvent.TOGGLE_MUSIC });
    if (isSoundActive) playClickSound();
    if (isMusicActive) {
      stopMusic();
    } else {
      playMusic();
    }
  };

  return (
    <SoundsWrapper>
      <Button onClick={handleSoundToggle}>
        {isSoundActive ? (
          <HiMiniSpeakerWave />
        ) : (
          <HiMiniSpeakerXMark color="red" />
        )}
      </Button>
      <Button onClick={handleMusicToggle}>
        {isMusicActive ? <MdMusicNote /> : <MdMusicOff color="red" />}
      </Button>
    </SoundsWrapper>
  );
};
