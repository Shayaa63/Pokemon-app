import { useState } from 'react'
import './App.css'
import PokemonApplication from './PokemonApplication.jsx'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick() {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <h1>Utforska de första 151 Pokémon</h1>
      <button onClick={handleClick}>
          {isVisible ? "Avsluta" : "Börja utforska"}
        </button>
      {isVisible && <PokemonApplication />}
    </div>
  )
}

export default App
