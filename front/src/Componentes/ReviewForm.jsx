import { useState } from 'react'

const ReviewForm = ({ onSubmitReview }) => {
  const [author, setAuthor] = useState('')
  const [score, setScore] = useState(5) // Dejamos 5 estrellas por defecto
  const [comment, setComment] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Validación para evitar campos vacíos
    if (author.trim() === '' || comment.trim() === '') {
      setErrorMsg('Por favor, completá tu nombre y el comentario.')
      return // Cortamos la ejecución acá para que no se envíe
    }

    // Limpiamos errores previos si los hubiera
    setErrorMsg('')

    // Le pasamos los datos a MovieDetail
    onSubmitReview({
      author: author,
      score: Number(score),
      comment: comment
    })

    // Vaciamos el formulario para que quede limpio
    setAuthor('')
    setScore(5)
    setComment('')
  }

  return (
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '500px' }}>
      <h3 style={{ marginTop: 0 }}>Agregar una reseña</h3>
      {errorMsg && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        
        <div>
          <label>Puntaje (1 al 5):</label>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={score} 
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        
        <div>
          <label>Comentario:</label>
          <textarea 
            rows="4" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <button type="submit">
          Enviar Reseña
        </button>
      </form>
    </div>
  )
}

export default ReviewForm