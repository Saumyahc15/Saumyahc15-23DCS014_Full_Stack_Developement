import React, { useState } from 'react';
// inline styles to replace missing SearchBar.css
const styles = {
  wrap: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, margin: '16px 0' },
  form: { display: 'flex', gap: 8, flex: 1 },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb' },
  button: { padding: '10px 14px', borderRadius: 8, border: 0, background: '#667eea', color: '#fff' },
  filters: { display: 'flex', gap: 8 },
  select: { padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb' }
};

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ category: e.target.value, difficulty });
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    onFilterChange({ category, difficulty: e.target.value });
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          🔍 Search
        </button>
      </form>
      <div style={styles.filters}>
        <select value={category} onChange={handleCategoryChange} style={styles.select}>
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="Beverage">Beverage</option>
        </select>
        <select value={difficulty} onChange={handleDifficultyChange} style={styles.select}>
          <option value="">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;