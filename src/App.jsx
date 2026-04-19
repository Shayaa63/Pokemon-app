import './App.css'
import PokemonApplication from './PokemonApplication.jsx'

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p className="app-subtitle">Utforska de första 151 Pokémon</p>
      </header>
      <PokemonApplication />
    </div>
  )
}

export default App