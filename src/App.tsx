import { useState } from "react";
import "./index.css";
import PokemonDetail from "./components/PokemonDetail";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-4">
        PokeAPI test (REST)
      </h1>
      <PokemonSearch onSearch={setSelectedPokemon} />
      {selectedPokemon && <PokemonDetail name={selectedPokemon} />}
    </div>
  );
}

export default App;
