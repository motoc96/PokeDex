import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Pokemon from "./components/Pokemon";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [pokemons, setPokemons] = useState([]);

  let [countPokemons, setCountPoke] = useState(0);

  function fetchPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon?generation=1&limit=151")
      .then((response) => response.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemon) {
          fetchPokemonData(pokemon);
        });
      });
  }

  function fetchPokemonData(pokemon) {
    let url = pokemon.url; // This saves the pokemon url to a variable
    fetch(url)
      .then((response) => response.json())
      .then(function (pokeData) {
        let tempObjPokemons = pokemons;
        tempObjPokemons.push(pokeData);
        setPokemons(tempObjPokemons);
      })
      .then(() => {
        if (pokemons && pokemons.length > 0) {
          setCountPoke((countPokemons = Math.random()));
        }
      });
  }
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/:pokemonIndex" component={Pokemon} />
          {countPokemons > 0 && <Cards cards={pokemons} />}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
