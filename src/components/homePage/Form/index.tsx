import { GameSelection } from "./GameSelection";
import { Usernames } from "./Usernames";
import { Boards } from "./Boards";

import { useSound } from "../../../hooks/useSound";
import clickSound from "../../../assets/click.mp3";
import { useForm } from "../../../hooks/useForm";

import { FormProps } from "./types";
import { FormWrapper, Box } from "./styles";

export const Form: React.FC<FormProps> = ({
  isSoundActive,
  formStep,
  ticTacToeConfigSend,
  ticTacToeConfigState,
}) => {
  const { playSound } = useSound(clickSound);

  const {
    handleBoardSizeChange,
    setFormState,
    setPlayers,
    setGameType,
    setUsernames,
    nick1,
    nick2,
    players,
  } = useForm({
    ...ticTacToeConfigState.context,
    ticTacToeConfigSend,
    isSoundActive,
    playSound,
  });

  return (
    <FormWrapper>
      <Box>
        {formStep === 1 && (
          <GameSelection
            setStep={() => setFormState(2)}
            setPlayers={setPlayers}
            setGameType={setGameType}
            isSoundActive={isSoundActive}
            playSound={playSound}
          />
        )}
        {formStep === 2 && (
          <Usernames
            players={players}
            playSound={playSound}
            isSoundActive={isSoundActive}
            setStep={() => setFormState(3)}
            setNick1={(nick) => setUsernames(nick, nick2)}
            setNick2={(nick) => setUsernames(nick1, nick)}
            nick1={nick1}
            nick2={nick2}
          />
        )}
        {formStep === 3 && (
          <Boards handleBoardSizeChange={handleBoardSizeChange} />
        )}
      </Box>
    </FormWrapper>
  );
};
