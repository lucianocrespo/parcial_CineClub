require('dotenv').config() // Cargamos las variables del archivo .env
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const data = require('./data.js')

// Conectamos los routers
const moviesRouter = require('./routes/movies')
const reviewsRouter = require('./routes/reviews')

const app = express()

// Middlewares
app.use(cors()) // Habilitamos cors para que el frontend en React pueda conectarse sin bloqueos
app.use(express.json())
app.use(morgan('tiny'))

// Ruta principal
app.get('/', (request, response) => {
  response.send('<h1>API de Películas y Reseñas</h1>')
})

// Ruta de información
app.get('/info', (request, response) => {
  const cantidadResenas = data.reviews.length
  const fechaHora = new Date()
  response.send(`
    <p>La API tiene registro de ${cantidadResenas} reseñas.</p>
    <p>${fechaHora}</p>
  `)
})

// Conectamos los routers a sus rutas base
app.use('/api/movies', moviesRouter)
app.use('/api/reviews', reviewsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})