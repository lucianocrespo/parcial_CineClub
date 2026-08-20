import { useState } from 'react'
import SearchBar from './Componentes/SearchBar'
import MovieGrid from './Componentes/MovieGrid'

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
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1 style={{ display: 'inline-block', marginRight: '20px' }}>CineClub</h1>
        {currentView === 'detail' && (
          <button onClick={() => setCurrentView('search')}>
            Volver al Buscador
          </button>
        )}
      </header>

      <main>
        {currentView === 'search' && (
          <div>
            <SearchBar onSearch={handleSearch} />

            {/* Renderizado condicional de los estados */}
            {isLoading && <p>Cargando resultados...</p>}
            {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
            
            {/* Si no está cargando y no hay error, mostramos la grilla */}
            {!isLoading && !errorMessage && (
              <MovieGrid movies={movies} onMovieSelect={goToDetail} />
            )}
          </div>
        )}

        {currentView === 'detail' && (
          <div>
            <p>Vista de Detalle de la película {selectedMovieId}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App