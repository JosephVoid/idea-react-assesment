import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../services/pokeApi";
import { useEffect, useState } from "react";

const usePokemonSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return {
    ...useQuery({
      queryKey: ["searchTerm", debouncedQuery],
      queryFn: async () => searchPokemon(debouncedQuery),
      enabled: !!debouncedQuery,
      retry: false,
    }),
    setQuery,
    query,
  };
};
export default usePokemonSearch;
