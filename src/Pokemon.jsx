import { useState, useEffect } from 'react'

function Pokemon({ url }) {
    const [pokemonData, setPokemonData] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setPokemonData(data);
                console.log(data);
            } catch (error) {
                console.error("Något gick fel när data om vald pokemon skulle ladda:", error);
            }
        }
        fetchData();
    }, [url]);

    if (!pokemonData) return <p>Laddar...</p>


    return (
    <div className='pokemonData-container'>
        <h2>{pokemonData.name}</h2>
        <img 
            src={pokemonData.sprites.front_default} 
            alt={pokemonData.name} 
        />
      <ul>
        {pokemonData.types.map((t, index) => (
          <li key={index}>{t.type.name}</li>
        ))}
      </ul>

      {/* Vikt & längd */}
      <p><strong>Vikt:</strong> {pokemonData.weight}</p>
      <p><strong>Längd:</strong> {pokemonData.height}</p>
    </div>
    )
}
export default Pokemon
