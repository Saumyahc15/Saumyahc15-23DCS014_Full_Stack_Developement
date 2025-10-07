import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
// removed missing Home.css import

const Home = () => {
  const { recipes, loading, error, fetchRecipes, setFilters } = useRecipes();

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchTerm) => {
    fetchRecipes({ search: searchTerm });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="home">
      <Hero />
      <div className="container">
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        
        {loading && <div className="loading">Loading delicious recipes...</div>}
        {error && <div className="error">Error: {error}</div>}
        
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
        
        {!loading && recipes.length === 0 && (
          <div className="no-recipes">
            <p>No recipes found. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;