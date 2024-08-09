import styled from "styled-components";

export const Wrapper = styled.main`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-height: 100vh;
  width: 100%;

  background-color: ${({ theme }) => theme.colors["white-2"]};
`;
