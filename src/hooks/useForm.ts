import { useCallback } from "react";

import { GameConfigEvent } from "../machines/TicTacToeConfigMachine";
import { UseFormProps } from "./types";

export const useForm = ({
  players,
  usernames,
  ticTacToeConfigSend,
  isSoundActive,
  playSound,
}: UseFormProps) => {
  const nick1 = usernames[0] || "";
  const nick2 = usernames[1] || "";

  const handleSetUsernames = useCallback(
    (nick1: string, nick2: string) => {
      ticTacToeConfigSend({
        type: GameConfigEvent.SET_USERNAMES,
        usernames: [nick1, nick2],
      });
    },
    [ticTacToeConfigSend],
  );

  const handleBoardSizeChange = useCallback(
    (boardSize: number) => {
      isSoundActive && playSound();

      ticTacToeConfigSend({ type: GameConfigEvent.SET_BOARD_SIZE, boardSize });
      handleSetUsernames(nick1, players === 2 ? nick2 : "Ai");
      setTimeout(() => {
        ticTacToeConfigSend({ type: GameConfigEvent.START_GAME });
      }, 100);
    },
    [
      isSoundActive,
      playSound,
      ticTacToeConfigSend,
      handleSetUsernames,
      nick1,
      players,
      nick2,
    ],
  );

  const setFormState = (formState: number) => {
    ticTacToeConfigSend({ type: GameConfigEvent.SET_FORM_STATE, formState });
  };

  const setPlayers = (num: number) => {
    ticTacToeConfigSend({ type: GameConfigEvent.SET_PLAYERS, players: num });
  };

  const setGameType = (type: string) => {
    ticTacToeConfigSend({
      type: GameConfigEvent.SET_GAME_TYPE,
      gameType: type,
    });
  };

  const setUsernames = (nick1: string, nick2: string) => {
    ticTacToeConfigSend({
      type: GameConfigEvent.SET_USERNAMES,
      usernames: [nick1, nick2],
    });
  };

  return {
    handleBoardSizeChange,
    setFormState,
    setPlayers,
    setGameType,
    setUsernames,
    nick1,
    nick2,
    players,
  };
};
