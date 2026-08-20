import { useState, useEffect } from 'react'
import ReviewList from './ReviewList'

const MovieDetail = ({ tmdbId }) => {
  const [movieData, setMovieData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Definimos la función adentro del useEffect
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true)
        const baseUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${baseUrl}/movies/${tmdbId}`)
        
        if (!response.ok) {
          throw new Error('Error al cargar los detalles')
        }

        const data = await response.json()
        setMovieData(data)
      } catch (err) {
        setError('No se pudo cargar la información de la película.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetail()
  }, [tmdbId]) // El array de dependencias tiene tmdbId para que re-ejecute si cambia la pelicula

  if (isLoading) return <p>Cargando detalles de la película...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!movieData) return null

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {movieData.poster_path && (
          <img 
            src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`} 
            alt={movieData.title} 
            style={{ borderRadius: '8px', maxHeight: '400px' }}
          />
        )}
        <div>
          <h2>{movieData.title}</h2>
          <p><strong>Año:</strong> {movieData.release_date?.substring(0, 4)}</p>
          <p><strong>Puntaje de la comunidad local:</strong> {movieData.avgScore} ⭐</p>
          <p>{movieData.overview}</p>
        </div>
      </div>
      
      <hr />
      
      <h3>Reseñas</h3>
      <ReviewList reviews={movieData.localReviews} />
      
    </div>
  )
}

export default MovieDetail