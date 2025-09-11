import { useEffect, useState } from "react";
import type { PokemonDetail } from "../types/types";

interface Props {
  name: string;
}

export default function PokemonDetail({ name }: Props) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!name) return;

    setPokemon(null);
    setError("");

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokemon not found");
        return res.json();
      })
      .then((data: PokemonDetail) => setPokemon(data))
      .catch(() => setError("No Pokémon found with that name"));
  }, [name]);

  return (
    <div className="flex justify-center p-4 text-center min-h-[200px]">
      {!name && (
        <div className="text-gray-500 text-lg">Type a Pokémon name above</div>
      )}

      {error && <div className="text-red-500 text-lg">{error}</div>}

      {!pokemon && !error && name && (
        <div className="text-gray-700 text-lg">Loading...</div>
      )}

      {pokemon && (
        <div className="bg-white rounded-lg shadow-md p-6 w-72">
          <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto mb-4 size-32"
          />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
