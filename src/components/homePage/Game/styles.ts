import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: calc(100% - 20px);
  max-width: 450px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.paleLavender};
  padding: 20px;
  margin: 0 20px;

  background-color: ${({ theme }) => theme.colors.white};

  @media (min-width: 768px) {
    width: 450px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GameStatus = styled.div`
  margin: 10px;

  font-size: 24px;
  color: ${({ theme }) => theme.colors.midnight};
`;
