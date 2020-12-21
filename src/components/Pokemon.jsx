import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  color: white;
  width: 80%;
  padding-top: 50px;
  margin: auto;
  & > h1 {
    text-transform: uppercase;
    text-align: center;
  }

  & > h2 {
    margin-left: 65px;
  }
  & > div[image="true"] {
    display: flex;
    justify-content: center;
    padding: 40px 0;

    & > img {
      width: 120px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      margin: 0 20px;
    }
  }

  & > div {
    display: flex;
    justify-content: space-around;

    & > fieldset {
      width: 40%;
      border: 1px solid rgba(255, 255, 255, 0.3);

      & > legend {
        font-size: 24px;
        font-variant-caps: all-small-caps;
      }

      & > ul {
        list-decoration: none;
        list-style: none;
        text-align: center;

        & > li {
          font-size: 18px;
        }
      }
    }
  }
`;

const TypeSpan = styled.span`
  background-color: rgba(255, 255, 255, 0.3);
  color: black;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
`;

function Pokemon() {
  const [name, setName] = useState("");
  const [imagesUrl, setImagesUrl] = useState([]);

  const [types, setTypes] = useState([]);

  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [specialAttack, setSpecialAttack] = useState("");
  const [specialDefense, setSpecialDefense] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [abilities, setAbilities] = useState("");

  let [refreshCounter, setRefreshCounter] = useState(0);
  const urlElements = window.location.href.split("/"); //this splits the url to get the pokemonIndex
  const pokemonIndex = urlElements[4];
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

  const fetchPokemonInformations = async () => {
    const response = await fetch(pokemonUrl);
    const pokemonRes = await response.json();

    // Set pokemon name
    const name = pokemonRes.name;
    setName(name);

    // Set image urls
    const responseObj = pokemonRes.sprites;
    for (var key in responseObj) {
      if (typeof responseObj[key] !== "object") {
        // Create a copy of object
        var tempimagesUrl = imagesUrl;
        // Add new data to the object
        tempimagesUrl.push(responseObj[key]);
        // Set new object in the state
        setImagesUrl(tempimagesUrl);
        setRefreshCounter((refreshCounter += 1));
      }
    }
    //Base stats for pokemons
    pokemonRes.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          setHp(stat["base_stat"]);
          break;
        case "attack":
          setAttack(stat["base_stat"]);
          break;
        case "defense":
          setDefense(stat["base_stat"]);
          break;
        case "speed":
          setSpeed(stat["base_stat"]);
          break;
        case "special-attack":
          setSpecialAttack(stat["base_stat"]);
          break;
        case "special-defense":
          setSpecialDefense(stat["base_stat"]);
          break;
      }
    });

    setHeight(pokemonRes.height);
    setWeight(pokemonRes.weight);

    setTypes(
      pokemonRes.types.map((type) => {
        return type.type.name;
      })
    );

    setAbilities(
      pokemonRes.abilities.map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
    );
  };
  useEffect(() => {
    fetchPokemonInformations();
  }, []);
  return (
    <Container>
      <h1>
        {name}
        {types &&
          types.map((type, i) => {
            return <TypeSpan key={i}>{type}</TypeSpan>;
          })}
      </h1>
      <div image="true">
        {refreshCounter > 0 &&
          imagesUrl.map((imageUrl, i) => {
            return <img key={i} src={imageUrl} alt="" />;
          })}
      </div>
      <h2>Height: {height}</h2>
      <h2>Weight: {weight}</h2>
      <div>
        <fieldset>
          <legend>Stats</legend>
          <ul>
            <li>HP: {hp}</li>
            <li>Attack: {attack}</li>
            <li>Defense: {defense}</li>
            <li>Speed: {speed}</li>
            <li>Special Attack: {specialAttack}</li>
            <li>Special Denense: {specialDefense}</li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Abilites</legend>
          <ul>
            {abilities &&
              abilities.map((ability, i) => {
                return <li key={i}>{ability}</li>;
              })}
          </ul>
        </fieldset>
      </div>
    </Container>
  );
}

export default Pokemon;
