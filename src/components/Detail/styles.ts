import styled from "styled-components";

export const Container = styled.div`
  background: whitesmoke;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

export const Name = styled.div`
  font-size: 50px;
  font-family: monospace;
  color: darkslateblue;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    font-size: 90px;
    margin-bottom: 30px;
  }
`;

export const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 1025px) {
    justify-content: space-between;
  }
`;

export const Image = styled.div`
  flex-basis: 40%;
  border: 10px solid lightyellow;
  margin-bottom: 25px;
  border-radius: 20px;
  background: azure;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (min-width: 1025px) {
    flex-basis: 20%;
  }
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;

const sharedStyles = `
  padding: 3px;
  margin: 5px;
  background: white;
  border-radius: 5px;
`;

export const HeightLabel = styled.div`
  ${sharedStyles};
  background: lightpink;
  border: 3px solid lightpink;
`;

export const WeightLabel = styled.div`
  ${sharedStyles};
  background: lightgreen;
  border: 3px solid lightgreen;
`;

export const MovesLabel = styled.div`
  ${sharedStyles};
  background: lightblue;
  border: 3px solid lightblue;
`;

export const AbilitiesLabel = styled.div`
  ${sharedStyles};
  background: lightsalmon;
  border: 3px solid lightsalmon;
`;

export const Height = styled.div`
  ${sharedStyles};
  border: 3px solid lightpink;
`;

export const Weight = styled.div`
  ${sharedStyles};
  border: 3px solid lightgreen;
`;

export const Move = styled.div`
  ${sharedStyles};
  border: 3px solid lightblue;
`;

export const Ability = styled.div`
  ${sharedStyles};
  border: 3px solid lightsalmon;
`;
