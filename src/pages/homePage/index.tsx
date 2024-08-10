import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";

import { SoundsManager } from "../../components/homePage/SoundsManager";
import { Game } from "../../components/homePage/Game";

import { soundManagerMachine } from "../../machines/SoundManagerMachine";
import { ticTacToeMachine } from "../../machines/TicTacToeMachine";
import { GameEvent } from "../../machines/TicTacToeMachine/constants";
import { ticTacToeConfigMachine } from "../../machines/TicTacToeConfigMachine";
import { GameConfigEvent } from "../../machines/TicTacToeConfigMachine/constants";

import { Form } from "../../components/homePage/Form";
import { Wrapper } from "./styles";

export const HomePage: React.FC = () => {
  const [state, send] = useMachine(soundManagerMachine);
  const [ticTacToeState, ticTacToeSend] = useMachine(ticTacToeMachine);
  const [ticTacToeConfigState, ticTacToeConfigSend] = useMachine(
    ticTacToeConfigMachine,
  );

  const { boardSize, gameType, usernames, gameStarted, formState } =
    ticTacToeConfigState.context;

  const isSoundActive = state.context.isSoundOn;
  const isMusicActive = state.context.isMusicOn;

  useEffect(() => {
    if (gameStarted) {
      ticTacToeSend({
        type: GameEvent.SETUP_GAME,
        gameType,
        usernames,
        boardSize,
      });
      ticTacToeConfigSend({
        type: GameConfigEvent.START_GAME,
      });
    }
  }, [
    boardSize,
    gameType,
    usernames,
    ticTacToeSend,
    ticTacToeConfigSend,
    formState,
    gameStarted,
  ]);

  return (
    <Wrapper>
      <SoundsManager
        send={send}
        isSoundActive={isSoundActive}
        isMusicActive={isMusicActive}
      />
      {!gameStarted && (
        <Form
          isSoundActive={isSoundActive}
          formStep={formState}
          ticTacToeConfigSend={ticTacToeConfigSend}
          ticTacToeConfigState={ticTacToeConfigState}
        />
      )}
      {gameStarted && (
        <Game
          isSoundActive={isSoundActive}
          {...ticTacToeState.context}
          send={ticTacToeSend}
          ticTacToeConfigSend={ticTacToeConfigSend}
          ticTacToeState={ticTacToeState}
          setStart={() => ticTacToeConfigSend({ type: GameConfigEvent.RESET })}
          setFormStep={() =>
            ticTacToeConfigSend({
              type: GameConfigEvent.SET_FORM_STATE,
              formState: 1,
            })
          }
          boardSize={boardSize}
        />
      )}
    </Wrapper>
  );
};
