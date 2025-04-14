import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../services/pokeApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addFavorite } from "../state/slices/favorites";
import { RootState } from "../state/store";

export const usePokemonDetails = (name: string) => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state);
  const isFavorite = favorites?.includes(name);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(name));
    } else {
      dispatch(addFavorite(name));
    }
  };

  return {
    ...useQuery({
      queryKey: ["pokemon", name],
      queryFn: () => fetchPokemonDetails(name),
      enabled: showDetails,
    }),
    showDetails,
    setShowDetails,
    toggleFavorite,
    isFavorite,
  };
};
