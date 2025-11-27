import { useEffect } from 'react'

function PokemonApplication() {
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            const data = await response.json()
            console.log(data)
        }   
        getData()
    }, []);
    

  return (
    <div>
        <h1>Hej</h1>
        <button>Close pokemon app</button>
    </div> 
  )
}

export default PokemonApplication