import { PopupProps } from "./types";

import { Wrapper, PopupContent, PopupImage } from "./styles";

export const Popup: React.FC<PopupProps> = ({ response }) => {
  return (
    <Wrapper data-testid="popup">
      <PopupContent>
        <PopupImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
          alt="ChatGPT logo"
        />
        AI move response: {response}
      </PopupContent>
    </Wrapper>
  );
};
