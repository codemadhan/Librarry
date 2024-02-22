// HomePage.js
import './HomePage.css';
import React, { useState, useEffect } from 'react';
import BookTable from './BookTable';
import FilterForm from './FilterForm';
import AddBookForm from './AddBookForm';
import axios from 'axios';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from backend when component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/library/books');
      setBooks(response.data);
      setFilteredBooks(response.data); // Initially set filteredBooks to all books
    } catch (error) {
      console.error('Error fetching books: ', error);
      setError('Error fetching books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    // Apply filters to books
    let filtered = books;
    

    if (filters.bookName) {
      filtered = filtered.filter(book => book.book_name && book.book_name.includes(filters.bookName));
      
    }
    
    if (filters.dateOfPublishing) {
      filtered = filtered.filter(book => book.published_date?.includes(filters.dateOfPublishing));
    }

    if (filters.author) {
      filtered = filtered.filter(book => book.book_author && book.book_author.includes(filters.author));
    }
    
    if (filters.subject) {
      filtered = filtered.filter(book => book.book_subject && book.book_subject.includes(filters.subject));
    }
    
    // Apply other filters similarly

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleUpdate = (id) => {
    // Implement update logic here
    console.log("Update book with id:", id);
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:8000/library/${id}`);
  
      // If successful, update the book list
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks); // Update filteredBooks as well if you're applying filters
      
      // Fetch the updated list of books from the server
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book: ', error);
      setError('Error deleting book. Please try again.');
    }
  };
  

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div class="mad-library-container">
  <h1>MAD-LIBRARY</h1>
  <div class="form-row">
    <div className="FilterForm">
    <FilterForm onFilterChange={handleFilterChange} applyFilters={applyFilters} />
    </div>
    
    <div className="AddBookForm">
    <AddBookForm fetchBooks={fetchBooks} />
    </div>
    
  </div>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      <BookTable books={currentBooks} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      {/* Pagination */}
      <ul class="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
          <li key={i}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>
    </>
  )}
</div>

  );
}

export default HomePage;
