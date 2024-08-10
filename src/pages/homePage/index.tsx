import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import soundManagerMachine from "../../machines/soundManagerMachine";
import ticTacToeMachine, { GameEvent } from "../../machines/ticTacToeMachine";
import { Form } from "../../components/homePage/Form";
import { SoundsManager } from "../../components/homePage/SoundsManager";
import { Game } from "../../components/homePage/Game";
import { Wrapper } from "./styles";

export const HomePage: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [boardSize, setBoardSize] = useState(3);

  const [state, send] = useMachine(soundManagerMachine);
  const [ticTacToeState, ticTacToeSend] = useMachine(ticTacToeMachine);

  const isSoundActive = state.context.isSoundOn;
  const isMusicActive = state.context.isMusicOn;

  const [start, setStart] = useState(false);
  const [gameType, setGameType] = useState<string | null>(null);
  const [playerInfo, setPlayerInfo] = useState<string[] | null>(null);

  useEffect(() => {
    if (gameType && playerInfo) {
      ticTacToeSend({
        type: GameEvent.SETUP_GAME,
        gameType,
        usernames: playerInfo,
        boardSize,
      });
      setStart(true);
    }
  }, [boardSize, gameType, playerInfo, ticTacToeSend]);

  const startGame = (type: string, playerInfo: string[]) => {
    setGameType(type);
    setPlayerInfo(playerInfo);
  };

  return (
    <Wrapper>
      <SoundsManager
        send={send}
        isSoundActive={isSoundActive}
        isMusicActive={isMusicActive}
      />
      {!start && (
        <Form
          startGame={startGame}
          isSoundActive={isSoundActive}
          formStep={formStep}
          setFormStep={setFormStep}
          setBoardSize={setBoardSize}
        />
      )}
      {start && (
        <Game
          {...ticTacToeState.context}
          send={ticTacToeSend}
          ticTacToeState={ticTacToeState}
          setStart={setStart}
          setFormStep={setFormStep}
          boardSize={boardSize}
        />
      )}
    </Wrapper>
  );
};
