// AddBookForm.js

import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ fetchBooks }) {
  const [bookData, setBookData] = useState({
    bookName: '',
    author: '',
    dateOfPublishing: '',
    subject: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setBookData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/library/add-book', bookData);
      fetchBooks(); // Fetch books again to update the list
      setBookData({
        bookName: '',
        author: '',
        dateOfPublishing: '',
        subject: '',
      });
      alert('Book added successfully');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  return (
    <div>
      <h2>ADD NEW BOOK</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bookName" value={bookData.bookName} onChange={handleChange} placeholder="Book Name" />
        <input type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="Author" />
        <input type="date" name="dateOfPublishing" value={bookData.dateOfPublishing} onChange={handleChange} placeholder="Date of Publishing" />
        <input type="text" name="subject" value={bookData.subject} onChange={handleChange} placeholder="Subject" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBookForm;
