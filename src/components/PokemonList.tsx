import { useEffect, useState } from "react";
import type { PokemonListResponse, PokemonListItem } from "../types/types";

interface Props {
  onSelect: (name: string) => void;
}

export default function PokemonList({ onSelect }: Props) {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data: PokemonListResponse) => setPokemons(data.results));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon) => (
        <button
          key={pokemon.name}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={() => onSelect(pokemon.name)}
        >
          {pokemon.name}
        </button>
      ))}
    </div>
  );
}
