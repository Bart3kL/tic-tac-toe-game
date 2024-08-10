import { FC } from "react";
import { Field } from "./Field";

import { useSound } from "../../../../hooks/useSound";
import click2Sound from "../../../../assets/click2.mp3";
import click3Sound from "../../../../assets/click3.mp3";

import { BoardProps } from "./types";
import { BoardBox } from "./style";

export const Board: FC<BoardProps> = ({
  board,
  onSquareClick,
  boardSize,
  currentPlayer,
  isSoundActive,
  isWinner,
}) => {
  const { playSound: playFirstPlayerClick } = useSound(click2Sound);
  const { playSound: playSecondPlayerClick } = useSound(click3Sound);

  console.log(board);
  return (
    <BoardBox boardSize={boardSize}>
      {board.map((value, index) => (
        <Field
          key={index}
          value={value}
          onClick={() => {
            onSquareClick(index);
            if (isSoundActive && !isWinner) {
              currentPlayer === "x"
                ? playFirstPlayerClick()
                : playSecondPlayerClick();
            }
          }}
        />
      ))}
    </BoardBox>
  );
};
