import styled from "styled-components";

export const BoardBox = styled.div<{ boardSize: number }>`
  display: grid;

  grid-template-columns: repeat(${(props) => props.boardSize}, 100px);

  grid-template-rows: repeat(
    ${(props) => props.boardSize},
    100px
  ); // Nowa linia

  gap: 5px;

  margin-bottom: 20px;
`;
