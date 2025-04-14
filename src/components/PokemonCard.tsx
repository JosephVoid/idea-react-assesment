import { memo } from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Loader from "./Loader";

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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{name.toUpperCase()}</CardTitle>
      </CardHeader>
      {showDetails && (
        <CardContent>
          {isLoading && <Loader />}
          {isError && <p>Error loading details.</p>}
          {data && (
            <div className="flex flex-col">
              <div className="flex gap-2">
                <img src={data.sprites.front_default} alt={name} />
                <img src={data.sprites.back_default} alt={name} />
              </div>
              <div>
                <b>Abilities</b>
                <p className="italic my-0">
                  {data.abilities.map((ab) => ab.ability.name).join(", ")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      )}
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          size="sm"
          className="cursor-pointer"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button
          onClick={toggleFavorite}
          variant="link"
          size="sm"
          className="cursor-pointer"
        >
          {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
        </Button>
      </CardFooter>
    </Card>
  );
});

export default PokemonCard;
