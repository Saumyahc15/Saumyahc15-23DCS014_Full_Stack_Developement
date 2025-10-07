import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
// removed missing Favorites.css import; using App.css base styles

const Favorites = () => {
  const { recipes, favorites } = useRecipes();
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe._id));

  return (
    <div className="favorites-page">
      <div className="container">
        <h1 className="page-title">Your Favorite Recipes ❤️</h1>
        {favoriteRecipes.length === 0 ? (
          <div className="empty-favorites">
            <p>You haven't added any favorites yet!</p>
            <p>Start exploring and save your favorite recipes.</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;