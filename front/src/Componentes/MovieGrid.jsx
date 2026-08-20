import MovieCard from './MovieCard'

const MovieGrid = ({ movies, onMovieSelect }) => {
  if (movies.length === 0) {
    return <p>Busca una película para ver los resultados.</p>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </div>
  )
}

export default MovieGrid