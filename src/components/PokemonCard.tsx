import { memo } from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

const PokemonCard = memo(({ name }: { name: string }) => {
  const {
    data,
    isLoading,
    isError,
    showDetails,
    setShowDetails,
    toggleFavorite,
    isFavorite,
  } = usePokemonDetails(name);

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="font-bold text-lg">{name.toUpperCase()}</h3>
      {showDetails && (
        <>
          {isLoading && <p>Loading details...</p>}
          {isError && <p>Error loading details.</p>}
          {data && <img src={data.sprites.front_default} alt={name} />}
        </>
      )}
      <button
        className="mt-2 text-sm text-blue-600"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      <button
        onClick={toggleFavorite}
        className={`mt-1 text-sm ${
          isFavorite ? "text-red-500" : "text-gray-500"
        }`}
      >
        {isFavorite ? "Remove Favorite ❤️" : "Add to Favorites 🤍"}
      </button>
    </div>
  );
});

export default PokemonCard;
