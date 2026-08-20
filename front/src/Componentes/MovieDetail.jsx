import { useState, useEffect } from 'react'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

const MovieDetail = ({ tmdbId }) => {
  const [movieData, setMovieData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
  }, [tmdbId])

  // Función para enviar la reseña a nuestro backend
  const handleReviewSubmit = async (reviewData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL
      // Hacemos el POST
      const response = await fetch(`${baseUrl}/movies/${tmdbId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })

      if (!response.ok) {
        throw new Error('Error al guardar la reseña')
      }

      const savedReview = await response.json()

      // La nueva reseña aparece sin recargar la página
      setMovieData({
        ...movieData,
        localReviews: movieData.localReviews.concat(savedReview)
      })

    } catch (err) {
      alert('Hubo un error al enviar la reseña. Verificá que el servidor esté encendido.')
    }
  }

  if (isLoading) return <p>Cargando detalles de la película...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!movieData) return null

  return (
    <div className="movie-detail">
      <div className="movie-info">
        {movieData.poster_path && (
          <img 
            src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`} 
            alt={movieData.title} 
            className="movie-poster"
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
      
      <ReviewForm onSubmitReview={handleReviewSubmit} />
    </div>
  )
}

export default MovieDetail