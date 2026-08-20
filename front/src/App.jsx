import { useState } from 'react'
import SearchBar from './Componentes/SearchBar'
import MovieGrid from './Componentes/MovieGrid'
import MovieDetail from './Componentes/MovieDetail'

const App = () => {
  const [currentView, setCurrentView] = useState('search')
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  // Estados para manejar los datos del servidor
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // Función que se dispara al enviar el formulario
  const handleSearch = async (query) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Leemos la variable de entorno de Vite
      const baseUrl = import.meta.env.VITE_API_URL
      const response = await fetch(`${baseUrl}/movies/search?q=${query}`)

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      setErrorMessage('Hubo un error al buscar las películas. Verificá que el servidor esté encendido.')
    } finally {
      setIsLoading(false)
    }
  }

  const goToDetail = (id) => {
    setSelectedMovieId(id)
    setCurrentView('detail')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CineClub</h1>
        
        {currentView === 'detail' && (
          <button onClick={() => setCurrentView('search')} className="btn-primary">
            Volver al Buscador
          </button>
        )}
      </header>

      <main>
        {currentView === 'search' && (
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
            
            {isLoading && <p>Cargando resultados...</p>}
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
            
            {!isLoading && !errorMessage && (
              <MovieGrid movies={movies} onMovieSelect={goToDetail} />
            )}
          </div>
        )}

        {currentView === 'detail' && (
          <MovieDetail tmdbId={selectedMovieId} />
        )}
      </main>
    </div>
  )
}

export default App