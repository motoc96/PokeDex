import React, { useState } from "react";
import Card from "./Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;

const Search = styled.input`
  display: flex;
  margin: 30px auto;
  height: 30px;
  width: 300px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0 20px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: black;
    opacity: 1;
  }
`;

function Cards({ cards }) {
  const [searchCards, setSearchCards] = useState(cards);

  function searchPokemon(event) {
    setSearchCards(
      cards.filter((card) => {
        return card.name.includes(event.target.value);
      })
    );
  }
  return (
    <>
      <Search
        type="text"
        onChange={searchPokemon}
        placeholder="Search for pokemon.."
      />
      <Container>
        {searchCards &&
          searchCards.map((card) => {
            return <Card key={card.id} {...card} />;
          })}
      </Container>
    </>
  );
}

export default Cards;
