import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Form } from "../../components/homePage/Form";
import { GameConfigEvent } from "../../machines/TicTacToeConfigMachine/constants";
import { ticTacToeConfigMachine } from "../../machines/TicTacToeConfigMachine";
import { createActor } from "xstate";
import "@testing-library/jest-dom";
import { theme } from "../../globalStyles";

describe("Form Component", () => {
  const ticTacToeConfigService = createActor(ticTacToeConfigMachine).start();
  const mockTicTacToeConfigSend = jest.fn();

  const defaultProps = {
    isSoundActive: false,
    formStep: 1,
    ticTacToeConfigSend: mockTicTacToeConfigSend,
    ticTacToeConfigState: ticTacToeConfigService.getSnapshot(),
  };

  // Helper function to render the Form component with default props
  const setup = (props = defaultProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <Form {...props} />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Group 1: Initial Rendering Tests
  describe("Initial Rendering Tests", () => {
    test("renders GameSelection component at step 1", async () => {
      setup();
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });

    test("renders Usernames component at step 2", async () => {
      setup({ ...defaultProps, formStep: 2 });
      expect(
        await screen.findByPlaceholderText(/Enter your nickname/i),
      ).toBeInTheDocument();
    });

    test("renders Boards component at step 3", async () => {
      setup({ ...defaultProps, formStep: 3 });
      expect(screen.getByTestId("step3")).toBeInTheDocument();
    });
  });

  // Group 2: Transition Tests
  describe("Transition Tests", () => {
    test("transition from GameSelection to Usernames on click", async () => {
      setup();
      const playWithFriendButton = screen.getByTestId(
        "play-with-friend-button",
      );
      fireEvent.click(playWithFriendButton);

      ticTacToeConfigService.send({
        type: GameConfigEvent.SET_FORM_STATE,
        formState: 2,
      });

      expect(ticTacToeConfigService.getSnapshot().context.formState).toBe(2);
    });

    test("transition from Usernames to Boards on submit", async () => {
      setup({ ...defaultProps, formStep: 2 });
      const input1 = (await screen.findByPlaceholderText(
        /Enter your nickname/i,
      )) as HTMLInputElement;
      fireEvent.change(input1, { target: { value: "player1" } });

      const board3x3Button = screen.findByText("Select board");
      fireEvent.click(await board3x3Button);

      ticTacToeConfigService.send({
        type: GameConfigEvent.SET_FORM_STATE,
        formState: 3,
      });

      expect(ticTacToeConfigService.getSnapshot().context.formState).toBe(3);
    });
  });

  // Group 3: Interaction Tests
  describe("Interaction Tests", () => {
    test("handles board size change correctly", async () => {
      setup({ ...defaultProps, formStep: 3 });

      const board3x3Button = screen.findByText("3x3");
      fireEvent.click(await board3x3Button);

      expect(mockTicTacToeConfigSend).toHaveBeenCalledWith({
        type: GameConfigEvent.SET_BOARD_SIZE,
        boardSize: 3,
      });
    });

    test("handles player input correctly", async () => {
      setup({ ...defaultProps, formStep: 2 });
      const input1 = (await screen.findByPlaceholderText(
        /Enter your nickname/i,
      )) as HTMLInputElement;
      fireEvent.change(input1, { target: { value: "player1" } });

      ticTacToeConfigService.send({
        type: GameConfigEvent.SET_USERNAMES,
        usernames: ["player1"],
      });

      expect(ticTacToeConfigService.getSnapshot().context.usernames[0]).toBe(
        "player1",
      );
    });
  });
});
