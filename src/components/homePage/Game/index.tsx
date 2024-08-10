import React, { useState, useEffect } from "react";

import { Board } from "./Board";
import { Popup } from "./Popup";

import { Typewriter } from "../../shared/Typewriter";
import { GameEvent, GameState } from "../../../machines/ticTacToeMachine";
import { getTypewriterText, getCurrentPlayerText } from "./utils";
import { Wrapper, GameStatus, Box } from "./styles";
import { prompt } from "../../../openai/prompts/aiMove";
import { Button } from "../../shared/Button";
import { GameProps } from "./types";
import useOpenAIStream from "../../../openai/streaming";
import { getOpenAiMove } from "../../../openai/getOpenAiMove";

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
}) => {
  const [winnerPrompt, setWinnerPrompt] = useState<string | null>(null);
  const { response } = useOpenAIStream(winnerPrompt);

  const [showPopup, setShowPopup] = useState(false);

  const handleSquareClick = (index: number): void => {
    send({ type: GameEvent.PLAY_MOVE, position: index });
  };

  const handleReset = (): void => {
    setFormStep(1);
    setStart(false);
    send({ type: GameEvent.RESET });
    setShowPopup(false);
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
          send({ type: GameEvent.PLAY_MOVE, position: aiMove });
        }
      }
    };

    fetchAiMove();
  }, [currentPlayer, gameType, grid, send, ticTacToeState]);

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
        <Typewriter text={typewriterText} delay={150} />
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
        />
        <Button onClick={handleReset} text="Reset" />
      </Box>
    </Wrapper>
  );
};

export default Game;
