import styled from "styled-components";

export const ButtonStyles = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 47px;
  min-width: 120px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.midnight};
  padding: 12px 18px;

  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.midnight};
  background-color: ${({ theme }) => theme.colors["white-2"]};

  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;
