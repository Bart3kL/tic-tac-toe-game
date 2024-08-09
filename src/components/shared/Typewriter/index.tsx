import React from "react";
import { TypewriterProps } from "./types";
import { Text } from "./styles";
import { useTypewriter } from "./hook";

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay,
  infinite = false,
}) => {
  const displayText = useTypewriter(text, delay, infinite);

  return <Text>{displayText}</Text>;
};
