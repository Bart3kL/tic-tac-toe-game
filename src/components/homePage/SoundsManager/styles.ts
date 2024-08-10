import styled from "styled-components";

export const SoundsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;

  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    bottom: 20px;
    left: 20px;
  }
`;

export const Button = styled.button`
  width: 55px;
  height: 55px;
  border: none;

  background-color: transparent;

  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.blue};
  }
`;
