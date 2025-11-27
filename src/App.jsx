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
      <h1>Fetch a pokemon</h1>
      {!isVisible && (
        <button onClick={handleClick}>
          Start Pokemon App
        </button>
      )}
      {isVisible && <PokemonApplication />}
    </div>
  )
}

export default App
