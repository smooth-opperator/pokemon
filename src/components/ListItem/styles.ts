import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
  height: 90px;
  width: 90px;
  margin: 0 3px 10px 3px;
  align-items: center;
  cursor: pointer;
  background: #ffffff;
  padding: 10px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    height: 150px;
    width: 150px;
  }
`;

export const IconContainer = styled.div<{ isSelected?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;

  svg {
    path {
      fill: ${({ isSelected }) => (isSelected ? "darkred" : "lavenderblush")};
    }
  }
`;

export const Sprite = styled.div`
  height: 70px;
  width: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 768px) {
    height: 120px;
    width: 130px;
  }
`;

export const Name = styled.div`
  color: #878787;
  font-size: 16px;
`;
