import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1000;

  padding: 1rem;
  margin-top: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  background-color: #f0f0f0;

  transform: translateX(-50%);
`;

export const PopupContent = styled.div`
  display: flex;
  align-items: center;
`;

export const PopupImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
