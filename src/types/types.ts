export interface IPokemon {
  name: string;
  url?: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export type IPokemonList = Pick<IPokemon, "name" | "url">[];
