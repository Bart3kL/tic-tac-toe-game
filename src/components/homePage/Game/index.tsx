import React, { useState, useEffect } from "react";
import { Board } from "./Board";
import { Typewriter } from "../../shared/Typewriter";
import { GameEvent, GameState } from "../../../machines/ticTacToeMachine";
import { getTypewriterText, getCurrentPlayerText } from "./utils";
import {
  Wrapper,
  GameStatus,
  Box,
  Popup,
  PopupContent,
  PopupImage,
} from "./styles"; // Import additional styles
import { Button } from "../../shared/Button";
import { getAiMove } from "../../../ai/getAiMove";
import { GameProps } from "./types";
import useOpenAIStream from "../../../ai/streaming"; // Import hooka

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
  const [showPopup, setShowPopup] = useState(false); // Add state for popup visibility

  const handleSquareClick = (index: number): void => {
    send({ type: GameEvent.PLAY_MOVE, position: index });
  };

  const handleReset = (): void => {
    setFormStep(1);
    setStart(false);
    send({ type: GameEvent.RESET });
    setShowPopup(false); // Hide popup on reset
  };

  // Fetch AI move after each user's move
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

  // Set the AI prompt when there's a winner
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

  // Show popup when the response is received
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
      {showPopup && (
        <Popup>
          <PopupContent>
            <PopupImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
              alt="ChatGPT logo"
            />
            {response}
          </PopupContent>
        </Popup>
      )}{" "}
      {/* Conditionally render popup */}
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
