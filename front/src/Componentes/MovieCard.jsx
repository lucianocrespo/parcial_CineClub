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
    <div className="movie-card" onClick={() => onMovieSelect(movie.id)}>
      <img src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Año: {year}</p>
      <p>Puntaje: {score} ⭐</p>
    </div>
  )
}

export default MovieCard