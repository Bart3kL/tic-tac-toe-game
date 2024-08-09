import { useEffect, useState } from "react";

import { TextSecondColor } from "./styles";

import { parseText } from "./utils";

export const useTypewriter = (
  text: string,
  delay: number,
  infinite: boolean,
) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const fullParsedText = parseText(text);

    const getDisplayText = (index: number) => {
      let charIndex = 0;
      const displayParts: Array<React.ReactNode> = [];

      for (const part of fullParsedText) {
        if (typeof part === "string") {
          if (charIndex + part.length > index) {
            displayParts.push(part.substring(0, index - charIndex));
            break;
          } else {
            displayParts.push(part);
            charIndex += part.length;
          }
        } else {
          const boldText = (part as React.ReactElement).props.children;

          if (charIndex + boldText.length > index) {
            displayParts.push(
              <TextSecondColor key={charIndex}>
                {boldText.substring(0, index - charIndex)}
              </TextSecondColor>,
            );
            break;
          } else {
            displayParts.push(part);
            charIndex += boldText.length;
          }
        }
      }

      return displayParts;
    };

    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(getDisplayText(currentIndex + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayText([]);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return displayText;
};
