import React from "react";
import { TextSecondColor } from "./styles";

export const parseText = (text: string) => {
  const parts: Array<React.ReactNode> = [];
  let currentIndex = 0;

  const tagRegEx = /<b>(.*?)<\/b>/g;
  let match;

  while ((match = tagRegEx.exec(text)) !== null) {
    const [fullMatch, matchedText] = match;
    const startIndex = match.index;
    const endIndex = startIndex + fullMatch.length;

    if (currentIndex < startIndex) {
      parts.push(text.substring(currentIndex, startIndex));
    }

    parts.push(
      <TextSecondColor key={startIndex}>{matchedText}</TextSecondColor>,
    );

    currentIndex = endIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts;
};
