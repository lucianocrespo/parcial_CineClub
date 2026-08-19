const express = require('express')
const router = express.Router()
const data = require('../data.js')

// DELETE /api/reviews/:reviewId (elimina una reseña por su ID buscando en el array en memoria)
router.delete('/:reviewId', (request, response) => {
  const id = request.params.reviewId
  
  // Buscamos si la reseña existe
  const resenaExiste = data.reviews.find(r => r.id === id)
  
  if (resenaExiste) {
    // Si existe, filtramos el array para dejar afuera la que tiene ese ID
    data.reviews = data.reviews.filter(r => r.id !== id)
    // Devolvemos 204 si salió bien
    response.status(204).end()
  } else {
    // Si no existe, devolvemos error 404
    response.status(404).json({ error: 'Reseña no encontrada' })
  }
})

module.exports = router