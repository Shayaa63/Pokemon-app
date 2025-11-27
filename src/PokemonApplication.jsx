import { useState, useEffect } from 'react'

function PokemonApplication() {
    const [pokemon, setPokemon] = useState([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            const data = await response.json()
            return setPokemon(data.results)
        }   
        getData()
    }, []);
    

  return (
    <div>
        <h1>Pokémon List</h1>
      <ul>
        {pokemon.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
        <button>Close pokemon app</button>
    </div> 
  )
}

export default PokemonApplication