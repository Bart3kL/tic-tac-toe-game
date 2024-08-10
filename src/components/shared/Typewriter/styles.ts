import styled from "styled-components";

export const Text = styled.p`
  min-height: 80px;
  margin-bottom: 40px;

  font-size: 36px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  line-height: 39.6px;
  letter-spacing: -1.08px;
  color: ${({ theme }) => theme.colors.midnight};

  @media (min-width: 380px) {
    min-height: 40px;
  }
`;

export const TextSecondColor = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;
