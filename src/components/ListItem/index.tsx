import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { IListItem } from "../interfaces";
import { Card, Sprite, IconContainer, Name } from "./styles";
import { ReactComponent as Heart } from "../../heart.svg";
import { handleError } from "../List/utils/helpers";

const ListItem: React.FC<IListItem> = ({
  name,
  url,
  isFavorite,
  toggleFavorite,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const detailLink = `/item/${url.split("/")[6]}`;

  const searchPokemonJSON = useCallback(() => {
    return fetch(url)
      .then((response) => response.json())
      .catch((e) => {
        handleError(e, "caught in searchPokemonJSON");
      });
  }, [url]);

  const searchPokemon = useCallback(async () => {
    try {
      const { sprites } = await searchPokemonJSON();

      const imgUrl = sprites.front_default
        ? sprites.front_default
        : Object.values<string>(sprites).find((sprite) => sprite !== null) ||
          "";

      setImageUrl(imgUrl);
    } catch (e) {
      handleError(e, "caught in searchPokemon");
    }
  }, [searchPokemonJSON]);

  useEffect(() => {
    searchPokemon();
  }, [searchPokemon]);

  return (
    <Card>
      <IconContainer
        onClick={() => toggleFavorite(url)}
        isSelected={isFavorite}
      >
        <Heart data-testid="heart" />
      </IconContainer>
      <Link to={detailLink}>
        <Sprite>
          <img src={imageUrl || ""} alt={name} />
        </Sprite>
        <Name>{name}</Name>
      </Link>
    </Card>
  );
};

export default ListItem;
