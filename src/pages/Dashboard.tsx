import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import usePokemonSearch from "../hooks/usePokemonSearch";
import { useMemo } from "react";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const { data, isLoading, isError, page, setPage } = usePokemonList();
  const {
    data: searchResult,
    isFetching: isSearching,
    query,
    setQuery,
  } = usePokemonSearch();
  const favorites = useSelector((state: RootState) => state);

  const displayedPokemons = useMemo(() => {
    if (query) {
      return searchResult ? searchResult : [];
    }
    return data || [];
  }, [query, searchResult, data]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pokémon Management Dashboard</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search Pokémon by name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded-md w-full mb-3"
        />
        {isSearching && <p>Searching...</p>}
      </div>
      <div className="flex">
        <div className="w-3/4">
          {isLoading ? (
            <p>
              {isError ? "Failed to load Pokémon list." : "Loading Pokémon..."}
            </p>
          ) : (
            <div>
              {query && "Search Result: "}
              {displayedPokemons.length === 0 ? (
                <div className="m-5">No Pokemon found</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {displayedPokemons?.map((pokemon: any) => (
                    <PokemonCard
                      key={pokemon?.name}
                      name={pokemon?.name ?? ""}
                    />
                  ))}
                </div>
              )}
              <Pagination setPage={setPage} page={page} />
            </div>
          )}
        </div>
        <div className="w-1/4 p-4">
          <h3 className="text-xl font-bold mb-4">Favorites</h3>
          {favorites.map((pokemonName: any) => (
            <PokemonCard key={pokemonName + "_fav"} name={pokemonName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
