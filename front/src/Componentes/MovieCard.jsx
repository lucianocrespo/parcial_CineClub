const MovieCard = ({ movie, onMovieSelect }) => {
  // mostramos el poster (y nos aseguramos de que la página no se rompa si falta una foto)
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=Sin+Imagen'

  // Extraemos solo el año de la fecha de lanzamiento
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'
  
  // El puntaje general de TMDB
  const score = movie.vote_average ? movie.vote_average.toFixed(1) : '0'

  return (
    <div
      onClick={() => onMovieSelect(movie.id)}
      style={{ border: '1px solid #ccc', padding: '10px', width: '200px', cursor: 'pointer', borderRadius: '8px' }}
    >
      <img src={imageUrl} alt={movie.title} style={{ width: '100%', borderRadius: '4px' }} />
      <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{movie.title}</h3>
      <p style={{ margin: '5px 0' }}>Año: {year}</p>
      <p style={{ margin: '5px 0' }}>Puntaje: {score} ⭐</p>
    </div>
  )
}

export default MovieCard