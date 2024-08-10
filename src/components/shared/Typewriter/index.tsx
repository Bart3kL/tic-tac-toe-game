import React from "react";
import { TypewriterProps } from "./types";
import { Text } from "./styles";
import { useTypewriter } from "./hook";

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay,
  id,
  infinite = false,
}) => {
  const displayText = useTypewriter(text, delay, infinite);

  return <Text data-testid={id}>{displayText}</Text>;
};
