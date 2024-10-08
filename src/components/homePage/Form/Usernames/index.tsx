import React from "react";

import { Button } from "../../../shared/Button";

import { Input, InputWrapper } from "./styles";

import { UsernamesProps } from "./types";
import { Typewriter } from "../../../shared/Typewriter";

export const Usernames: React.FC<UsernamesProps> = ({
  players,
  playSound,
  isSoundActive,
  setStep,
  setNick1,
  setNick2,
  nick1,
  nick2,
}) => {
  const handleSubmit = () => {
    isSoundActive && playSound();
    setTimeout(() => {
      setStep();
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
        id="step2"
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
            placeholder="Enter second player nickname"
            value={nick2}
            onChange={(e) => setNick2(e.target.value)}
          />
        )}
      </InputWrapper>
      <Button onClick={handleSubmit} text="Select board" />
    </>
  );
};
