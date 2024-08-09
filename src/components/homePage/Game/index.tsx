/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Board } from "./Board";
import { Typewriter } from "../../shared/Typewriter";
import { GameEvent, GameState } from "../../../machines/ticTacToeMachine";
import { getTypewriterText, getCurrentPlayerText } from "./utils";
import { Wrapper, GameStatus, Box } from "./styles";

import { Button } from "../../shared/Button";
import { getAiMove } from "../../../ai/getAiMove";

import { GameProps } from "./types";

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
}) => {
  const handleSquareClick = (index: number): void => {
    send({ type: GameEvent.PLAY_MOVE, position: index });
  };

  const handleReset = (): void => {
    setFormStep(1);
    setStart(false);
    send({ type: GameEvent.RESET });
  };

  useEffect(() => {
    const fetchAiMove = async () => {
      if (
        gameType === "PlayVsRobot" &&
        currentPlayer === "o" &&
        ticTacToeState.matches(GameState.IN_PROGRESS)
      ) {
        const aiMove = await getAiMove(grid);
        const isValidMove = grid[aiMove] === null;

        if (isValidMove && aiMove !== -1) {
          send({ type: GameEvent.PLAY_MOVE, position: aiMove });
        }
      }
    };

    fetchAiMove();
  }, [currentPlayer, gameType, grid, send, ticTacToeState]);

  const typewriterText = getTypewriterText(gameType, usernames);
  const currentText = getCurrentPlayerText(gameType, currentPlayer, usernames);
  const winner = getCurrentPlayerText(gameType, winningPlayer!, usernames);

  return (
    <Wrapper>
      <Box>
        <Typewriter text={typewriterText} delay={150} />
        <GameStatus>
          {ticTacToeState.matches(GameState.VICTORY) && `Winner: ${winner}`}
          {ticTacToeState.matches(GameState.DRAW) && "Draw!"}
          {ticTacToeState.matches(GameState.IN_PROGRESS) &&
            `Now: ${currentText}`}
        </GameStatus>
        <Board board={grid} onSquareClick={handleSquareClick} />
        <Button onClick={handleReset} text="Reset" />
      </Box>
    </Wrapper>
  );
};
