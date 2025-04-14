import { IPokemon, IPokemonList } from "../types/types";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchPokemonList = async (
  page: number,
  limit = 10
): Promise<IPokemonList> => {
  const offset = (page - 1) * limit;
  const res = await axios.get(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.data) throw new Error("Failed to fetch Pokemon list");
  return res.data.results as IPokemonList;
};

export const fetchPokemonDetails = async (name: string) => {
  const res = await axios.get(`${API_BASE}/pokemon/${name}`);
  if (!res.data) throw new Error("Failed to fetch Pokemon details");
  return res.data as IPokemon;
};

export const searchPokemon = async (searchTerm: string) => {
  try {
    const res = await axios.get(
      `${API_BASE}/pokemon/${searchTerm.toLowerCase()}`
    );
    if (!res.data) throw new Error("Failed to search pokemon");
    if (!res.data?.name) {
      throw new Error("Pokemon not found");
    }
    return [res.data] as IPokemon[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
