import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  ImageGallery,
  Image,
  Features,
  Move,
  Ability,
  Name,
  Weight,
  WeightLabel,
  Height,
  HeightLabel,
  MovesLabel,
  AbilitiesLabel,
} from "./styles";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<Array<string>>([]);
  const [moves, setMoves] = useState<Array<string>>([]);
  const [abilities, setAbilities] = useState<Array<string>>([]);
  const [name, setName] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const query = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const queryPokemonJSON = async (query: string) => {
    const response = await fetch(query);
    return response.json();
  };

  const queryPokemon = useCallback(
    async (query: string) => {
      const { name, abilities, moves, sprites, height, weight } =
        await queryPokemonJSON(query);
      setName(name);
      setHeight(height);
      setWeight(weight);

      const spriteImages = (Object.values(sprites) as Array<string>).filter(
        (sprite) => typeof sprite === "string"
      );
      setImages(spriteImages);

      const pokemonMoves = (
        Object.values(moves) as Array<{ move: { name: string } }>
      ).map((val) => val.move.name);
      setMoves(pokemonMoves);

      const pokemonAbilities = (
        Object.values(abilities) as Array<{ ability: { name: string } }>
      ).map((val) => val.ability.name);
      setAbilities(pokemonAbilities);
    },
    [setImages, setMoves, setAbilities]
  );

  useEffect(() => {
    queryPokemon(query);
  }, [query, queryPokemon]);

  return (
    <Container>
      <Name>{name}</Name>
      <ImageGallery data-testid="sprite-images">
        {images.map((image) => (
          <Image key={image}>
            <img src={image} alt={image} />
          </Image>
        ))}
      </ImageGallery>
      <Features>
        <HeightLabel>Height</HeightLabel>
        <Height>{height} decimeters</Height>
        <WeightLabel>Weight</WeightLabel>
        <Weight>{weight} hectograms</Weight>
        <MovesLabel>Moves</MovesLabel>
        {moves.map((move) => (
          <Move key={move}>{move}</Move>
        ))}
        <AbilitiesLabel>Abilities</AbilitiesLabel>
        {abilities.map((ability) => (
          <Ability key={ability}>{ability}</Ability>
        ))}
      </Features>
    </Container>
  );
};

export default Detail;
