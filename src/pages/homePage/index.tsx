import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import soundManagerMachine from "../../machines/soundManagerMachine";
import ticTacToeMachine, { GameEvent } from "../../machines/ticTacToeMachine";
import { Form } from "../../components/homePage/Form";
import { SoundsManager } from "../../components/homePage/SoundsManager";
import { Game } from "../../components/homePage/Game";
import { Wrapper } from "./styles";

export const HomePage: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [state, send] = useMachine(soundManagerMachine);
  const [ticTacToeState, ticTacToeSend] = useMachine(ticTacToeMachine);

  const isSoundActive = state.context.isSoundOn;
  const isMusicActive = state.context.isMusicOn;

  const [start, setStart] = useState(false);

  const startGame = (type: string, playerInfo: string[]) => {
    ticTacToeSend({
      type: GameEvent.SETUP_GAME,
      gameType: type,
      usernames: playerInfo,
    });
    setStart(true);
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
        />
      )}
      {start && (
        <Game
          {...ticTacToeState.context}
          send={ticTacToeSend}
          ticTacToeState={ticTacToeState}
          setStart={setStart}
          setFormStep={setFormStep}
        />
      )}
    </Wrapper>
  );
};
