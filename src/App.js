// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import ReviewForm from './components/ReviewForm';

function App() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchBooks = (searchTerm) => {
    // Replace 'YOUR_API_KEY' with your actual Google Books API key
    const API_KEY = 'AIzaSyBjYn0Eya_tiM1KT8j44OPOy9L8oIOahcs';
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`;

    axios.get(API_URL)
      .then((response) => {
        const bookData = response.data.items.map((item) => {
          return {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(', ') || 'Unknown',
            description: item.volumeInfo.description || 'No description available',
          };
        });
        setBooks(bookData);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setBooks([]);
      });
  };

  const submitReview = (reviewText) => {
    setReviews([...reviews, reviewText]);
  };

  useEffect(() => {
    fetchBooks('React JS'); // Initial search when the app loads
  }, []);

  return (
    <div className="App">
      <h1>Online Bookstore</h1>
      <SearchForm onSearch={fetchBooks} />
      <BookList books={books} />
      <h2>Reviews</h2>
      <ReviewForm onSubmitReview={submitReview} />
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
