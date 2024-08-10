/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import { Board } from "./Board";
import { Popup } from "./Popup";
import { Button } from "../../shared/Button";
import { Typewriter } from "../../shared/Typewriter";

import {
  GameEvent,
  GameState,
} from "../../../machines/TicTacToeMachine/constants";
import { GameConfigEvent } from "../../../machines/TicTacToeConfigMachine/constants";
import { getTypewriterText, getCurrentPlayerText } from "./utils";
import { prompt } from "../../../openai/prompts/aiMove";
import useOpenAIStream from "../../../openai/streaming";
import { getOpenAiMove } from "../../../openai/getOpenAiMove";
import { useSound } from "../../../hooks/useSound";
import clickSound from "../../../assets/click.mp3";
import click3Sound from "../../../assets/click3.mp3";
import winSound from "../../../assets/win.mp3";

import { GameProps } from "./types";
import { Wrapper, GameStatus, Box } from "./styles";

export const Game: React.FC<GameProps> = ({
  send,
  grid,
  currentPlayer,
  winningPlayer,
  gameType,
  usernames,
  ticTacToeState,
  setStart,
  setFormStep,
  boardSize,
  isSoundActive,
  ticTacToeConfigSend,
}) => {
  const [winnerPrompt, setWinnerPrompt] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { response } = useOpenAIStream(winnerPrompt);
  const { playSound } = useSound(clickSound);
  const { playSound: playAiPlayerClick } = useSound(click3Sound);
  const { playSound: playWinSound } = useSound(winSound);

  const playWinSoundRef = useRef(playWinSound);
  const hasPlayedWinSoundRef = useRef(false);

  const handleSquareClick = (index: number): void => {
    send({ type: GameEvent.PLAY_MOVE, position: index });
  };

  const handleReset = (): void => {
    isSoundActive && playSound();
    setTimeout(() => {
      setFormStep();
      setStart(false);
      send({ type: GameEvent.RESET });
      ticTacToeConfigSend({ type: GameConfigEvent.RESET });
      setShowPopup(false);
      hasPlayedWinSoundRef.current = false;
    }, 100);
  };

  useEffect(() => {
    const fetchAiMove = async () => {
      if (
        gameType === "PlayVsRobot" &&
        currentPlayer === "o" &&
        ticTacToeState.matches(GameState.IN_PROGRESS)
      ) {
        const newArray = grid.map((value, index) => ({
          index: index,
          itBelongsAlreadyToSamone: value !== null,
        }));
        const aiMove = await getOpenAiMove(`
          #ARRAY
          [${JSON.stringify(newArray)}]
          ${prompt}
          `);
        const isValidMove = grid[aiMove] === null;

        if (isValidMove && aiMove !== -1) {
          isSoundActive && playAiPlayerClick();

          send({ type: GameEvent.PLAY_MOVE, position: aiMove });
        }
      }
    };

    fetchAiMove();
  }, [
    currentPlayer,
    gameType,
    grid,
    isSoundActive,
    playAiPlayerClick,
    send,
    ticTacToeState,
  ]);

  useEffect(() => {
    if (
      ticTacToeState.matches(GameState.VICTORY) &&
      gameType === "PlayVsRobot"
    ) {
      const winnerText = getCurrentPlayerText(
        gameType,
        winningPlayer!,
        usernames,
      );
      setWinnerPrompt(`The winner is ${winnerText}. `);
    }
  }, [ticTacToeState, gameType, winningPlayer, usernames]);

  useEffect(() => {
    if (
      ticTacToeState.matches(GameState.VICTORY) &&
      !hasPlayedWinSoundRef.current
    ) {
      if (isSoundActive) {
        playWinSoundRef.current();
        hasPlayedWinSoundRef.current = true;
      }
    }
  }, [ticTacToeState, isSoundActive]);

  useEffect(() => {
    if (response) {
      setShowPopup(true);
    }
  }, [response]);

  const typewriterText = getTypewriterText(gameType, usernames);
  const currentText = getCurrentPlayerText(gameType, currentPlayer, usernames);
  const winner = getCurrentPlayerText(gameType, winningPlayer!, usernames);

  return (
    <Wrapper>
      {showPopup && <Popup response={response} />}
      <Box>
        <Typewriter text={typewriterText} delay={150} id="game" />
        <GameStatus>
          {ticTacToeState.matches(GameState.VICTORY) && `Winner: ${winner}`}
          {ticTacToeState.matches(GameState.DRAW) && "Draw!"}
          {ticTacToeState.matches(GameState.IN_PROGRESS) &&
            `Now: ${currentText}`}
        </GameStatus>
        <Board
          board={grid}
          onSquareClick={handleSquareClick}
          boardSize={boardSize}
          currentPlayer={currentPlayer}
          isSoundActive={isSoundActive}
          isWinner={ticTacToeState.matches(GameState.VICTORY)}
        />
        <Button onClick={handleReset} text="Reset" />
      </Box>
    </Wrapper>
  );
};
