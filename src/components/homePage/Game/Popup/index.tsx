import { PopupProps } from "./types";

import { Wrapper, PopupContent, PopupImage } from "./styles";

export const Popup: React.FC<PopupProps> = ({ response }) => {
  return (
    <Wrapper>
      <PopupContent>
        <PopupImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
          alt="ChatGPT logo"
        />
        {response}
      </PopupContent>
    </Wrapper>
  );
};
