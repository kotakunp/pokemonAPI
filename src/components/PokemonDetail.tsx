import { useEffect, useState } from "react";
import type { PokemonDetail } from "../types/types";

interface Props {
  name: string;
}

export default function PokemonDetail({ name }: Props) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (!name) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data: PokemonDetail) => setPokemon(data));
  }, [name]);

  if (!name) return <div className="p-4">Select a Pokemon</div>;
  if (!pokemon) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height} </p>
      <p>Weight: {pokemon.weight} </p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")} </p>
    </div>
  );
}
