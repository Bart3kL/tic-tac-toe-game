import styled from "styled-components";

export const FieldBtn = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.paleLavender};

  font-size: 34px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.midnight};
  cursor: ${(props) => (props.value ? "default" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.value ? "#fff" : "#d9def0")};
  }

  @media (min-width: 768px) {
    width: 75px;
    height: 75px;
  }
`;
