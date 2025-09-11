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

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokemon not found");
        return res.json();
      })
      .then((data: PokemonDetail) => setPokemon(data))
      .catch(() => setError("No Pokemon found with that name"));
  }, [name]);

  if (!name) return <div className="p-4">Select a Pokemon</div>;
  if (error) return <div className="p-4">{error}</div>;
  if (!pokemon) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto"
      />
      <p>Height: {pokemon.height} </p>
      <p>Weight: {pokemon.weight} </p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")} </p>
    </div>
  );
}
