const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No hay reseñas por el momento, pero podes dejar la tuya!</p>
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map(review => (
          <li key={review.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>{review.author}</strong> - {review.score} ⭐
            </p>
            <p style={{ margin: 0 }}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewList