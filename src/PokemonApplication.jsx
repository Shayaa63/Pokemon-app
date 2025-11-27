import { useState, useEffect } from 'react'
import Pokemon from './Pokemon.jsx'

function PokemonApplication() {
    const [pokemon, setPokemon] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [showPokemon, setShowPokemon] = useState("");
    useEffect(() => {
        const getResults = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            const data = await response.json()

            return setPokemon(data.results);
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
        <h1>Pokémon List</h1>
      <select value={selectedPokemon} onChange={(e) => setSelectedPokemon(e.target.value)}>
        <option value="">Välj en Pokémon</option>
        {pokemon.map((p, index) => (
          <option key={index}>{p.name}</option>
        ))}
      </select>
      {selectedPokemon && 
      <p>
        Du valde: {selectedPokemon}
        <button onClick={handleFetchInfo}>Hämta data om {selectedPokemon}</button>
      </p>}
        {showPokemon && <Pokemon name={selectedPokemon} />}
        <button>Close pokemon app</button>
    </div> 
  )
}

export default PokemonApplication