import styled from "styled-components";

export const FieldBtn = styled.button`
  width: 100px;
  height: 100px;

  font-size: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.paleLavender};

  color: ${({ theme }) => theme.colors.midnight};
  cursor: ${(props) => (props.value ? "default" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.value ? "#fff" : "#d9def0")};
  }
`;
