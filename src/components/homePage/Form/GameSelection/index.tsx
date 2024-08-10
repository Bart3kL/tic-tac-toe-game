import { Button } from "../../../shared/Button";

import { ButtonsWrapper } from "./styles";

import { GameSelectionProps } from "./types";
import { Typewriter } from "../../../shared/Typewriter";

export const GameSelection: React.FC<GameSelectionProps> = ({
  setStep,
  setPlayers,
  setGameType,
  isSoundActive,
  playSound,
}) => {
  const handleSelection = (numPlayers: number, gameType: string) => {
    isSoundActive && playSound();
    setPlayers(numPlayers);
    setGameType(gameType);
    setTimeout(() => {
      setStep();
    }, 100);
  };

  return (
    <>
      <Typewriter text={"Select game <b>type</b>"} delay={150} id="step1" />
      <ButtonsWrapper>
        <Button
          onClick={() => handleSelection(1, "PlayVsRobot")}
          text="Play vs ai"
        />
        <Button
          onClick={() => handleSelection(2, "PlayWithAFriend")}
          text="Play with a friend"
          dataTestId="play-with-friend-button"
        />
      </ButtonsWrapper>
    </>
  );
};
