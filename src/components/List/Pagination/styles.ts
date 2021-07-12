import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: gainsboro;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  padding: 10px;
`;

export const PaginationButton = styled.button<{ isDisabled: boolean }>`
  width: 80px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "all")};
  background: ${({ isDisabled }) => (isDisabled ? "lightgrey" : "whitesmoke")};
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  border: none;
  a {
    text-decoration: none;
    color: ${({ isDisabled }) => (isDisabled ? "darkgrey" : "black")};
  }
`;

export const PaginationMessage = styled.div`
  display: flex;
`;
