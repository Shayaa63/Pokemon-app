import { useState, useEffect } from 'react'

function slumpa10(lista) {
  return [...lista].sort(() => Math.random() - 0.5).slice(0, 10)
}

function PokemonApplication() {
  const [pokemonList, setPokemonList] = useState([])
  const [karusell, setKarusell] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [loadingKarusell, setLoadingKarusell] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        const data = await res.json()
        setPokemonList(data.results)
        await hämtaKarusell(data.results)
      } catch (e) {
        console.error(e)
      }
    }
    fetchList()
  }, [])

  async function hämtaKarusell(lista) {
    setLoadingKarusell(true)
    const urval = slumpa10(lista || pokemonList)
    const detaljerade = await Promise.all(
      urval.map(p => fetch(p.url).then(r => r.json()))
    )
    setKarusell(detaljerade)
    setLoadingKarusell(false)
  }

  async function sökPokemon() {
    if (!search.trim()) return
    setLoadingSearch(true)
    setSearchResult(null)
    try {
      const match = pokemonList.find(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      if (match) {
        const data = await fetch(match.url).then(r => r.json())
        setSearchResult(data)
      } else {
        setSearchResult("ingen")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingSearch(false)
    }
  }

  return (
    <div className="pokedex-wrapper">

      {/* SÖK LÄNGST UPP */}
      <div className="sok-sektion">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Sök bland alla 151 Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sökPokemon()}
            className="search-input"
          />
          <button className="search-btn" onClick={sökPokemon}>Sök</button>
        </div>

        {loadingSearch && <p className="loading-text">Söker...</p>}

        {searchResult === "ingen" && (
          <p className="loading-text">Ingen Pokémon hittades.</p>
        )}

        {searchResult && searchResult !== "ingen" && (
          <div className="search-result-card" onClick={() => setSelectedPokemon(searchResult)}>
            <img
              src={searchResult.sprites.other['official-artwork'].front_default || searchResult.sprites.front_default}
              alt={searchResult.name}
              className="search-result-img"
            />
            <div>
              <p className="search-result-name">{searchResult.name}</p>
              <p className="search-result-number">#{String(searchResult.id).padStart(3, '0')}</p>
              <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
                {searchResult.types.map(t => (
                  <span key={t.type.name} className="type-badge-small">{t.type.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="divider">
        <span>eller utforska slumpmässiga</span>
      </div>

      {/* KARUSELL + KNAPP */}
      <div className="karusell-wrapper">
        <div className="karusell-sektion">
          {loadingKarusell ? (
            <p className="loading-text">Laddar Pokémon...</p>
          ) : (
            <div className="scene">
              <div className="carousel-ring">
                {karusell.map((p, index) => {
                  const angle = (360 / karusell.length) * index
                  return (
                    <div
                      key={p.name}
                      className="pokemon-card"
                      style={{ '--angle': `${angle}deg` }}
                      onClick={() => setSelectedPokemon(p)}
                    >
                      <img
                        src={p.sprites.other['official-artwork'].front_default || p.sprites.front_default}
                        alt={p.name}
                        className="card-img"
                      />
                      <p className="card-name">{p.name}</p>
                      <p className="card-number">#{String(p.id).padStart(3, '0')}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Flygande knapp vid sidan */}
        <div className="karusell-side">
          <button className="flying-btn" onClick={() => hämtaKarusell()}>
            <span className="flying-btn-icon">✦</span>
            Slumpa<br />10 nya
          </button>
        </div>
      </div>

      {/* MODAL */}
      {selectedPokemon && (
        <div className="modal-overlay" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPokemon(null)}>✕</button>
            <div className="pokemon-detail">
              <div className="pokemon-img-wrap">
                <img
                  src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default}
                  alt={selectedPokemon.name}
                  className="pokemon-detail-img"
                />
              </div>
              <h2 className="pokemon-detail-name">{selectedPokemon.name}</h2>
              <p className="pokemon-detail-number">#{String(selectedPokemon.id).padStart(3, '0')}</p>
              <div className="type-badges">
                {selectedPokemon.types.map(t => (
                  <span key={t.type.name} className="type-badge">{t.type.name}</span>
                ))}
              </div>
              <div className="pokemon-stats">
                <div className="stat-item">
                  <span className="stat-label">Vikt</span>
                  <span className="stat-value">{selectedPokemon.weight / 10} kg</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Längd</span>
                  <span className="stat-value">{selectedPokemon.height / 10} m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">HP</span>
                  <span className="stat-value">{selectedPokemon.stats[0].base_stat}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Attack</span>
                  <span className="stat-value">{selectedPokemon.stats[1].base_stat}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Defense</span>
                  <span className="stat-value">{selectedPokemon.stats[2].base_stat}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Hastighet</span>
                  <span className="stat-value">{selectedPokemon.stats[5].base_stat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default PokemonApplication