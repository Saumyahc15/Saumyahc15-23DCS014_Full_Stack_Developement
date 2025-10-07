import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
// minimal inline styles to replace missing RecipeCard.css
const styles = {
  card: {
    background: '#fff', borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)', transition: 'transform .2s',
  },
  imageWrap: { position: 'relative', height: 180, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  favBtn: { position: 'absolute', right: 10, top: 10, border: 0, background: '#fff', borderRadius: 999, padding: '6px 10px' },
  content: { padding: 16 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 700 },
  badge: { color: '#fff', borderRadius: 8, padding: '2px 8px', fontSize: 12 },
  desc: { color: '#6b7280', marginTop: 6 },
  meta: { display: 'flex', gap: 12, marginTop: 10, color: '#4b5563', fontSize: 14 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }
};

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, likeRecipe } = useRecipes();
  const isFavorite = favorites.includes(recipe._id);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe._id);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    likeRecipe(recipe._id);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <div style={styles.imageWrap}>
        <img style={styles.img} src={recipe.imageUrl} alt={recipe.title} />
        <button style={styles.favBtn} onClick={handleFavoriteClick}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.title}>{recipe.title}</h3>
          <span style={{ ...styles.badge, backgroundColor: getDifficultyColor(recipe.difficulty) }}>
            {recipe.difficulty}
          </span>
        </div>
        <p style={styles.desc}>{recipe.description}</p>
        <div style={styles.meta}>
          <span>⏱️ {Number(recipe.prepTime || 0) + Number(recipe.cookTime || 0)} min</span>
          <span>🍽️ {recipe.servings} servings</span>
          <span>🌍 {recipe.cuisine}</span>
        </div>
        <div style={styles.footer}>
          <span>{recipe.category}</span>
          <button onClick={handleLikeClick}>👍 {recipe.likes}</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;