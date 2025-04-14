import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import usePokemonSearch from "../hooks/usePokemonSearch";
import { useMemo } from "react";
import Pagination from "../components/Pagination";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import Favorites from "./Favorites";

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
      <h2 className="text-2xl font-bold mb-4">Pokemon Management Dashboard</h2>
      <div className="w-1/3 flex gap-4 my-5 items-center">
        <Input
          type="search"
          placeholder="Search Pokemon by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && <Loader />}
      </div>
      <div className="flex">
        <div className="w-3/4">
          {isLoading ? (
            <>{isError ? <p>Failed to load Pokémon list.</p> : <Loader />}</>
          ) : (
            <div>
              {query && <p className="mb-3">Search Result: </p>}
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
              {!query && <Pagination setPage={setPage} page={page} />}
            </div>
          )}
        </div>
        <Favorites favorites={favorites} />
      </div>
    </div>
  );
};

export default Dashboard;
