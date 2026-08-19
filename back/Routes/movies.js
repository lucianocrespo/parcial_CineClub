const express = require('express')
const router = express.Router()
const data = require('../data.js')

const TMDB_API_KEY = process.env.TMDB_API_KEY // Leemos la clave de TMDB desde el archivo .env

// GET /api/movies/search?q=:query
// Busca películas en TMDB y devuelve los resultados.
router.get('/search', async (request, response) => {
  const query = request.query.q
  
  if (!query) {
    return response.status(400).json({ error: 'Se requiere el parámetro q para buscar' })
  }

  try {
    // Hacemos la petición a la API de TMDB
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`
    const tmdbResponse = await fetch(url)
    const tmdbData = await tmdbResponse.json()
    
    // Le devolvemos al frontend exactamente lo que respondió TMDB
    response.json(tmdbData)
  } catch (error) {
    response.status(500).json({ error: 'Error al consultar TMDB' })
  }
})

// GET /api/movies/:tmdbId
// Detalle de una película desde TMDB + combinamos con nuestras reseñas en memoria
router.get('/:tmdbId', async (request, response) => {
  const tmdbId = request.params.tmdbId

  try {
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
    const tmdbResponse = await fetch(url)

    // Si TMDB no tiene esa película, respondemos con error 404
    if (tmdbResponse.status === 404) {
      return response.status(404).json({ error: 'Película no encontrada en TMDB' })
    }

    const movieData = await tmdbResponse.json()

    // Buscamos si en nuestro data.js hay reseñas guardadas para este ID específico
    const movieReviews = data.reviews.filter(r => r.tmdbId === tmdbId)

    // Calculamos el promedio del puntaje
    let avgScore = 0
    if (movieReviews.length > 0) {
      const sumaTotal = movieReviews.reduce((acumulador, r) => acumulador + r.score, 0)
      avgScore = sumaTotal / movieReviews.length
    }

    // Armamos un objeto nuevo que junta la peli de TMDB, nuestras reseñas y el promedio
    response.json({
      ...movieData,
      localReviews: movieReviews,
      avgScore: avgScore
    })

  } catch (error) {
    response.status(500).json({ error: 'Error interno del servidor' })
  }
})

module.exports = router