import PokemonCard from "@/components/PokemonCard";

const Favorites = ({ favorites }: { favorites: string[] }) => {
  return (
    <div className="w-1/4 p-4 ">
      <h3 className="text-xl font-bold mb-4">Favorites</h3>
      <div className="flex-col flex gap-3 overflow-y-scroll h-[70vh]">
        {favorites.map((pokemonName: any) => (
          <PokemonCard key={pokemonName + "_fav"} name={pokemonName} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
