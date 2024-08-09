import React, { useState } from "react";
import { GameSelection } from "./GameSelection";
import { Usernames } from "./Usernames";

import useSound from "../../../hooks/useSound";
import clickSound from "../../../assets/click.mp3";

import { FormWrapper, Box } from "./styles";

import { FormProps } from "./types";

export const Form: React.FC<FormProps> = ({
  startGame,
  isSoundActive,
  setFormStep,
  formStep,
}) => {
  const [players, setPlayers] = useState(1);
  const [gameType, setGameType] = useState("PlayVsRobot");

  const handleStartGame = (usernames: { nick1: string; nick2: string }) => {
    startGame(gameType, [usernames.nick1, usernames.nick2]);
  };

  const { playSound } = useSound(clickSound);

  return (
    <FormWrapper>
      <Box>
        {formStep === 1 ? (
          <GameSelection
            setStep={setFormStep}
            setPlayers={setPlayers}
            setGameType={setGameType}
            isSoundActive={isSoundActive}
            playSound={playSound}
          />
        ) : (
          <Usernames
            players={players}
            startGame={handleStartGame}
            playSound={playSound}
            isSoundActive={isSoundActive}
          />
        )}
      </Box>
    </FormWrapper>
  );
};
