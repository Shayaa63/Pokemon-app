import { useState, useEffect } from 'react'

const typeColors = {
  fire: '#f97316', water: '#3b82f6', grass: '#22c55e',
  electric: '#eab308', psychic: '#ec4899', ice: '#67e8f9',
  dragon: '#7c3aed', dark: '#1e293b', fairy: '#f9a8d4',
  normal: '#94a3b8', fighting: '#b45309', flying: '#7dd3fc',
  poison: '#a855f7', ground: '#d97706', rock: '#78716c',
  bug: '#84cc16', ghost: '#6d28d9', steel: '#94a3b8',
}

function Pokemon({ url }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [url])

  if (!data) return <p className="loading-text">Laddar...</p>

  const mainType = data.types[0].type.name
  const color = typeColors[mainType] || '#3b82f6'

  return (
    <div className="pokemon-detail">
      <div className="pokemon-img-wrap" style={{ background: `${color}22` }}>
        <img
          src={data.sprites.other['official-artwork'].front_default || data.sprites.front_default}
          alt={data.name}
          className="pokemon-detail-img"
        />
      </div>

      <h2 className="pokemon-detail-name">{data.name}</h2>
      <p className="pokemon-detail-number">#{String(data.id).padStart(3, '0')}</p>

      <div className="type-badges">
        {data.types.map((t) => (
          <span key={t.type.name} className="type-badge" style={{
            background: `${typeColors[t.type.name]}33`,
            color: typeColors[t.type.name] || '#fff',
            border: `1px solid ${typeColors[t.type.name]}66`
          }}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="pokemon-stats">
        <div className="stat-item">
          <span className="stat-label">Vikt</span>
          <span className="stat-value">{data.weight / 10} kg</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Längd</span>
          <span className="stat-value">{data.height / 10} m</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">HP</span>
          <span className="stat-value">{data.stats[0].base_stat}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Attack</span>
          <span className="stat-value">{data.stats[1].base_stat}</span>
        </div>
      </div>
    </div>
  )
}

export default Pokemon