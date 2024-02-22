import React, { useState } from 'react';

function FilterForm({ onFilterChange, applyFilters }) {
  const [filters, setFilters] = useState({
    bookName: '',
    author: '',
    dateOfPublishing: '',
    subject: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange(name, value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    applyFilters(filters);
  };

  return (
    <div>
      <h2>FILTER BOOKS</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bookName" value={filters.bookName} onChange={handleChange} placeholder="Book Name" />
        <input type="text" name="author" value={filters.author} onChange={handleChange} placeholder="Author" />
        <input type="date" name="dateOfPublishing" value={filters.dateOfPublishing} onChange={handleChange} placeholder="Date of Publishing" />
        <input type="text" name="subject" value={filters.subject} onChange={handleChange} placeholder="Subject" />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
}

export default FilterForm;
