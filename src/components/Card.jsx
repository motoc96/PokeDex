import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 300px;
  width: 350px;
  border: 1px solid rgba(255, 255, 255, 0);
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Image = styled.img`
  width: 200px;
  margin: auto;
  display: block;
`;

const Text = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
function Card({ id, name }) {
  return (
    <StyledLink to={`${id}`}>
      <Container>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
        <Text>{name}</Text>
      </Container>
    </StyledLink>
  );
}

export default Card;
