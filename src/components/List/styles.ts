import styled from "styled-components";

export const Container = styled.div`
  background: whitesmoke;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;

  a {
    text-decoration: none;
  }
`;
