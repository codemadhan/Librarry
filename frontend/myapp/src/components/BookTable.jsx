// BookTable.jsx
import './BookTable.css';
import React from 'react';

function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function BookTable({ books, handleUpdate, handleDelete }) {
  console.log(books); // Log books to check if data is received

  if (!books || books.length === 0) {
    return <p>No books found</p>;
  }

  return (
    <div>
      <h2>BOOK LIST</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Date of Publishing</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.book_id}>
              <td>{book.book_name}</td>
              <td>{book.book_author}</td>
              <td>{formatDate(book.published_date)}</td>
              <td>{book.book_subject}</td>
              <td>
                <button onClick={() => handleDelete(book.book_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
