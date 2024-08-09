import { FC } from "react";
import { Field } from "./Field";
import { BoardBox } from "./style";
import { BoardProps } from "./types";

export const Board: FC<BoardProps> = ({ board, onSquareClick, boardSize }) => {
  return (
    <BoardBox boardSize={boardSize}>
      {board.map((value, index) => (
        <Field key={index} value={value} onClick={() => onSquareClick(index)} />
      ))}
    </BoardBox>
  );
};
