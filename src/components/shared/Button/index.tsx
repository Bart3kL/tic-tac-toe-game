import React from "react";

import { ButtonProps } from "./types";
import { ButtonStyles } from "./styles";

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <ButtonStyles onClick={onClick}>{text}</ButtonStyles>;
};
