import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { IPokemonListResult } from "../interfaces";
import { calculateOffset, handleError } from "./utils/helpers";
import Pagination from "./Pagination/index";
import Loader from "./../Loader/index";
import { Container, Results } from "./styles";
const ListItem = React.lazy(() => import("../ListItem/index"));

const List: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const offset = calculateOffset(page);
  const query = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;

  const [count, setCount] = useState<number>(0);
  const [results, setResults] = useState<[IPokemonListResult] | null>(null);
  const [favorites, setFavorites] = useState<Array<string>>([]);

  const queryPokemonJSON = (query: string) => {
    return fetch(query)
      .then((response) => response.json())
      .catch((e) => {
        handleError(e, "caught in queryPokemonJSON");
      });
  };

  const queryPokemon = useCallback(
    async (query: string) => {
      try {
        const { count, results } = await queryPokemonJSON(query);
        setCount(count);
        setResults(results);
      } catch (e) {
        handleError(e, "caught in queryPokemon");
      }
    },
    [setCount, setResults]
  );

  useEffect(() => {
    queryPokemon(query);
  }, [query, queryPokemon]);

  const toggleFavorite = (pokemonUrl: string) => {
    const faves = favorites.find((fav) => fav === pokemonUrl)
      ? [...favorites].filter((fav) => fav !== pokemonUrl)
      : [...favorites].concat(pokemonUrl);

    setFavorites(faves);
  };

  return (
    <Container>
      <Pagination totalCount={count} pageCount={results ? results.length : 0} />
      <Results data-testid="list-results">
        {results
          ? results.map((pokemon) => (
              <Suspense fallback={<Loader />} key={pokemon.url}>
                <ListItem
                  url={pokemon.url}
                  name={pokemon.name}
                  isFavorite={favorites.indexOf(pokemon.url) > -1}
                  toggleFavorite={toggleFavorite}
                />
              </Suspense>
            ))
          : null}
      </Results>
    </Container>
  );
};

export default React.memo(List);
