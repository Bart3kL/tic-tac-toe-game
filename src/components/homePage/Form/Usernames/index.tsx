import React, { useState } from "react";

import { Button } from "../../../shared/Button";

import { Input, InputWrapper } from "./styles";

import { UsernamesProps } from "./types";
import { Typewriter } from "../../../shared/Typewriter";

export const Usernames: React.FC<UsernamesProps> = ({
  players,
  startGame,
  playSound,
  isSoundActive,
}) => {
  const [nick1, setNick1] = useState("");
  const [nick2, setNick2] = useState("");

  const handleSubmit = () => {
    isSoundActive && playSound();
    setTimeout(() => {
      startGame({ nick1, nick2: players === 2 ? nick2 : "Komputer" });
    }, 100);
  };

  return (
    <>
      <Typewriter
        text={
          players === 1
            ? "Enter your <b>nickname</b>"
            : "Enter your <b>nicknames</b>"
        }
        delay={150}
      />
      <InputWrapper>
        <Input
          type="text"
          placeholder={
            players === 2 ? "First player nickname" : "Enter your nickname"
          }
          value={nick1}
          onChange={(e) => setNick1(e.target.value)}
        />
        {players === 2 && (
          <Input
            type="text"
            placeholder="Second player nickname"
            value={nick2}
            onChange={(e) => setNick2(e.target.value)}
          />
        )}
      </InputWrapper>
      <Button onClick={() => handleSubmit()} text="Graj" />
    </>
  );
};
