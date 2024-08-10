import React from "react";

import { BoardsProps } from "./types";
import { Typewriter } from "../../../shared/Typewriter";
import { Button } from "../../../shared/Button";

import { ButtonsWrapper } from "./styles";

export const Boards: React.FC<BoardsProps> = ({ handleBoardSizeChange }) => {
  return (
    <>
      <Typewriter text="Wybierz <b>grę</b>" delay={150} />
      <ButtonsWrapper>
        <Button onClick={() => handleBoardSizeChange(3)} text="3x3" />
        <Button onClick={() => handleBoardSizeChange(4)} text="4x4" />
        <Button onClick={() => handleBoardSizeChange(5)} text="5x5" />
      </ButtonsWrapper>
    </>
  );
};
