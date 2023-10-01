// src/components/BookList.js
import React, { useState } from 'react';

function BookList({ books }) {
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (bookId) => {
    if (reviewText.trim() !== '') {
      setReviews({
        ...reviews,
        [bookId]: [...(reviews[bookId] || []), reviewText],
      });
      setReviewText('');
    }
  };

  const handleRatingChange = (bookId, rating) => {
    setRatings({
      ...ratings,
      [bookId]: rating,
    });
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <div>
            <label>Rating:</label>
            <select
              onChange={(e) => handleRatingChange(book.id, e.target.value)}
              value={ratings[book.id] || ''}
            >
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div>
            <label>Review:</label>
            <textarea
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <button onClick={() => handleReviewSubmit(book.id)}>
            Submit Review
          </button>
          <div>
            <h4>Reviews:</h4>
            {reviews[book.id] &&
              reviews[book.id].map((review, index) => (
                <div key={index} className="review">
                  <p>{review}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
