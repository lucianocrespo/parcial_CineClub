const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="no-reviews-msg">No hay reseñas por el momento, pero podes dejar la tuya!</p>
  }

  return (
    <div>
      <ul className="review-list">
        {reviews.map(review => (
          <li key={review.id} className="review-item">
            <p>
              <strong>{review.author}</strong> - {review.score} ⭐
            </p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewList