import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  color: #1a202c;
  font-size: 24px;
`;
export const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  padding: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000; /* Ensure it is above other elements */
  margin-top: 10px;
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
