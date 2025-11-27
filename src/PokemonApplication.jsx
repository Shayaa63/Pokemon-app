import { useState, useEffect } from 'react'
import Pokemon from './Pokemon.jsx'

function PokemonApplication() {
    const [pokemonList, setPokemonList] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [showPokemon, setShowPokemon] = useState(false);
    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
                const data = await response.json()
                setPokemonList(data.results);
            } catch (error) {
                console.error("Något gick fel i samband med fetch av Pokemon listan:", error);
            }
        }   
        getResults();
    }, []);

    function handleFetchInfo() {
    if (selectedPokemon) {
      setShowPokemon(true)
    }
  }
    

  return (
    <div>
        <h2>Pokémon List</h2>
      <select value={selectedPokemon} onChange={(e) => {
        const value = e.target.value;
        setSelectedPokemon(value);
        setShowPokemon(value !== "");}}>
        <option value="">Välj en Pokémon</option>
        {pokemonList.map((p, index) => (
          <option key={index} value={p.url}>{p.name}</option>
        ))}
      </select>
        {showPokemon && <Pokemon url={selectedPokemon} />}
    </div> 
  )
}

export default PokemonApplication