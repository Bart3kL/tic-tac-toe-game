import { FC } from "react";
import { FieldProps } from "./types";
import { FieldBtn } from "./style";

export const Field: FC<FieldProps> = ({ value, onClick }) => (
  <FieldBtn onClick={onClick} value={value as string}>
    {value}
  </FieldBtn>
);
