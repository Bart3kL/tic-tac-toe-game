import React from "react";

import { ButtonProps } from "./types";
import { ButtonStyles } from "./styles";

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  dataTestId,
}) => {
  return (
    <ButtonStyles onClick={onClick} data-testid={dataTestId}>
      {text}
    </ButtonStyles>
  );
};
