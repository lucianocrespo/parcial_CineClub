import { useState } from 'react'

const App = () => {
  const [currentView, setCurrentView] = useState('search')
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  return (
    <div>
      <header>
        <h1>CineClub</h1>
        {/* Botón para volver a inicio */}
        <button onClick={() => setCurrentView('search')}>
          Volver al Buscador
        </button>
      </header>

      <main>
        {currentView === 'search' && (
          <div>
            {/* SearchBar y MovieGrid */}
            <p>Vista de Búsqueda</p>
          </div>
        )}

        {currentView === 'detail' && (
          <div>
            {/* MovieDetail */}
            <p>Vista de Detalle de la película {selectedMovieId}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App