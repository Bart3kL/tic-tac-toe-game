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
  setBoardSize,
}) => {
  const [players, setPlayers] = useState(1);
  const [gameType, setGameType] = useState("PlayVsRobot");
  const [nick1, setNick1] = useState("");
  const [nick2, setNick2] = useState("");

  const handleStartGame = (usernames: { nick1: string; nick2: string }) => {
    startGame(gameType, [usernames.nick1, usernames.nick2]);
  };

  const { playSound } = useSound(clickSound);

  const handleBoardSizeChange = (size: number) => {
    setBoardSize(size);
    handleStartGame({ nick1, nick2: players === 2 ? nick2 : "Komputer" });
  };

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
        ) : formStep === 2 ? (
          <Usernames
            players={players}
            playSound={playSound}
            isSoundActive={isSoundActive}
            setStep={setFormStep}
            setNick2={setNick2}
            setNick1={setNick1}
            nick1={nick1}
            nick2={nick2}
          />
        ) : (
          <div>
            <h2>Wybierz grę</h2>
            {/* Cokolwiek innego co tutaj masz */}

            <div>
              <button onClick={() => handleBoardSizeChange(3)}>3x3</button>
              <button onClick={() => handleBoardSizeChange(4)}>4x4</button>
              <button onClick={() => handleBoardSizeChange(5)}>5x5</button>
            </div>
          </div>
        )}
      </Box>
    </FormWrapper>
  );
};
