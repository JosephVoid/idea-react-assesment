import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../services/pokeApi";
import { useState } from "react";

export const usePokemonList = () => {
  const [page, setPage] = useState(1);
  return {
    ...useQuery({
      queryKey: ["pokemonList", page],
      queryFn: () => fetchPokemonList(page, 10),
    }),
    setPage,
    page,
  };
};
