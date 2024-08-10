import styled from "styled-components";

export const BoardBox = styled.div<{ boardSize: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.boardSize}, 50px);
  grid-template-rows: repeat(${(props) => props.boardSize}, 50px);
  gap: 5px;

  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.boardSize}, 75px);
    grid-template-rows: repeat(${(props) => props.boardSize}, 75px);
  }
`;
