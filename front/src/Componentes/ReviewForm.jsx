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
    <div className="review-form">
      <h3>Agregar una reseña</h3>
      
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Puntaje (1 al 5):</label>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={score} 
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Comentario:</label>
          <textarea 
            rows="4" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
        </div>
        
        <button type="submit" className="btn-dark">
          Enviar Reseña
        </button>
      </form>
    </div>
  )
}

export default ReviewForm