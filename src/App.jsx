import { useState } from 'react'
import './App.css'
import PokemonApplication from './PokemonApplication.jsx'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick() {
    setIsVisible(true)
  }

  return (
    <div>
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
