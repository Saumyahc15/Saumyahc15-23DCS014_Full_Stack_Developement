import React, { createContext, useState, useContext, useEffect } from 'react';
import { recipeAPI } from '../services/api';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const fetchRecipes = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recipeAPI.getAll({ ...filters, ...params });
      setRecipes(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipeData) => {
    try {
      const response = await recipeAPI.create(recipeData);
      setRecipes([response.data.data, ...recipes]);
      return response.data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const likeRecipe = async (recipeId) => {
    try {
      await recipeAPI.like(recipeId);
      setRecipes(recipes.map(recipe => 
        recipe._id === recipeId 
          ? { ...recipe, likes: recipe.likes + 1 }
          : recipe
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const value = {
    recipes,
    favorites,
    loading,
    error,
    filters,
    setFilters,
    fetchRecipes,
    addRecipe,
    toggleFavorite,
    likeRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};