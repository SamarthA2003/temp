// src/components/ReviewForm.js
import React, { useState } from 'react';

function ReviewForm({ onSubmitReview }) {
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    onSubmitReview(reviewText);
    setReviewText('');
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <textarea
        rows="4"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
