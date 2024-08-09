import { FC } from "react";
import { Field } from "./Field";
import { BoardBox } from "./style";
import { BoardProps } from "./types";

export const Board: FC<BoardProps> = ({ board, onSquareClick }) => (
  <BoardBox>
    {board.map((value, index) => (
      <Field key={index} value={value} onClick={() => onSquareClick(index)} />
    ))}
  </BoardBox>
);
