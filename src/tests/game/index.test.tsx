import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Game } from "../../components/homePage/Game";
import { ticTacToeMachine } from "../../machines/TicTacToeMachine";
import {
  GameEvent,
  GameState,
} from "../../machines/TicTacToeMachine/constants";
import { PlayerType, CellValue } from "../../machines/TicTacToeMachine/types";
import { createActor } from "xstate";
import "@testing-library/jest-dom";
import { theme } from "../../globalStyles";

describe("Game Component", () => {
  const ticTacToeService = createActor(ticTacToeMachine).start();
  const mockSend = jest.fn();
  const mockTicTacToeConfigSend = jest.fn();

  const defaultProps = {
    send: mockSend,
    grid: Array(9).fill(null) as CellValue[],
    currentPlayer: "x" as PlayerType,
    winningPlayer: undefined as PlayerType | undefined,
    gameType: "PlayWithFriend",
    usernames: ["Player1", "Player2"],
    ticTacToeState: ticTacToeService.getSnapshot(),
    setStart: jest.fn(),
    setFormStep: jest.fn(),
    boardSize: 3,
    isSoundActive: true,
    ticTacToeConfigSend: mockTicTacToeConfigSend,
  };

  // Helper function to render the Game component with default props
  const setup = (props = defaultProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <Game {...props} />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Group 1: Initial Rendering Tests
  describe("Initial Rendering Tests", () => {
    test("renders game board correctly", () => {
      setup();
      const squares = screen.getAllByRole("button");
      expect(squares.length - 1).toBe(defaultProps.grid.length);
    });

    test("shows winner text when game is won", () => {
      setup({
        ...defaultProps,
        ticTacToeState: {
          ...defaultProps.ticTacToeState,
          value: GameState.VICTORY,
        },
        winningPlayer: "x",
      });
      expect(screen.getByText("Winner: Player1")).toBeInTheDocument();
    });

    test("shows draw text when game is drawn", () => {
      setup({
        ...defaultProps,
        ticTacToeState: {
          ...defaultProps.ticTacToeState,
          value: GameState.DRAW,
        },
      });
      expect(screen.getByText("Draw!")).toBeInTheDocument();
    });
  });

  // Group 2: Transition Tests
  describe("Transition Tests", () => {
    test("handles a player's move correctly", () => {
      setup();
      const square = screen.getAllByRole("button")[0];
      fireEvent.click(square);
      expect(mockSend).toHaveBeenCalledWith({
        type: GameEvent.PLAY_MOVE,
        position: 0,
      });
    });

    test("handles AI move correctly", async () => {
      const grid: CellValue[] = [
        "x",
        null,
        null,
        null,
        "o",
        null,
        null,
        null,
        null,
      ];

      setup({
        ...defaultProps,
        grid,
        currentPlayer: "o",
        gameType: "PlayVsRobot",
        ticTacToeState: {
          ...defaultProps.ticTacToeState,
          value: GameState.IN_PROGRESS,
        },
      });

      setTimeout(() => {
        expect(mockSend).toHaveBeenCalledWith(
          expect.objectContaining({ type: GameEvent.PLAY_MOVE }),
        );
      }, 1000);
    });

    test("renders popup for AI move", async () => {
      setup({
        ...defaultProps,
        ticTacToeState: {
          ...defaultProps.ticTacToeState,
          value: GameState.VICTORY,
        },
        gameType: "PlayVsRobot",
        winningPlayer: "o",
      });

      setTimeout(() => {
        expect(screen.getByTestId("popup")).toBeInTheDocument();
      }, 1000);
    });
  });

  // Group 3: Extended Machine Tests
  describe("Extended Machine Tests", () => {
    test("The game should start with an empty board in a running state and player X", () => {
      const actor = createActor(ticTacToeMachine).start();
      const { value, context } = actor.getSnapshot();

      expect(value).toBe(GameState.IN_PROGRESS);
      expect(context.grid).toEqual(Array(9).fill(null));
      expect(context.currentPlayer).toBe("x");
    });

    test("Player X should be able to place an 'x' on the board", () => {
      const actor = createActor(ticTacToeMachine).start();

      actor.send({ type: GameEvent.PLAY_MOVE, position: 2 });

      const { context } = actor.getSnapshot();
      expect(context.grid[2]).toBe("x");
      expect(context.currentPlayer).toBe("o");
    });

    test("Should recognize a win for player X", () => {
      const actor = createActor(ticTacToeMachine).start();

      actor.send({ type: GameEvent.PLAY_MOVE, position: 0 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 4 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 1 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 3 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 2 });

      const { value, context } = actor.getSnapshot();
      expect(value).toBe(GameState.VICTORY);
      expect(context.winningPlayer).toBe("x");
    });

    test("Should identify a draw situation accurately", () => {
      const actor = createActor(ticTacToeMachine).start();

      actor.send({ type: GameEvent.PLAY_MOVE, position: 0 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 1 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 2 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 4 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 3 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 6 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 5 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 8 });
      actor.send({ type: GameEvent.PLAY_MOVE, position: 7 });

      const { value } = actor.getSnapshot();
      expect(value).toBe(GameState.DRAW);
    });

    test("Should restart the game properly", () => {
      const actor = createActor(ticTacToeMachine).start();

      actor.send({ type: GameEvent.PLAY_MOVE, position: 0 });

      actor.send({ type: GameEvent.RESET });

      const { value, context } = actor.getSnapshot();
      expect(value).toBe(GameState.IN_PROGRESS);
      expect(context.grid).toEqual(Array(9).fill(null));
      expect(context.currentPlayer).toBe("x");
    });
  });
});
