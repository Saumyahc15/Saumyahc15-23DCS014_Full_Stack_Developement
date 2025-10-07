import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/api';
// minimal inline styles to replace missing RecipeDetail.css
const styles = {
  backBtn: { marginBottom: 16, border: 0, padding: '8px 12px', borderRadius: 8 },
  header: { display: 'flex', gap: 16, background: '#fff', padding: 16, borderRadius: 12 },
  image: { width: 320, height: 220, objectFit: 'cover', borderRadius: 12 },
  info: { flex: 1 },
  title: { fontSize: 28, fontWeight: 800 },
  metaRow: { display: 'flex', gap: 12, marginTop: 10 },
  box: { background: '#f8fafc', padding: 8, borderRadius: 8, fontSize: 14 },
  tag: { background: '#eef2ff', padding: '4px 8px', borderRadius: 999, marginRight: 8 },
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeAPI.getById(id);
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="error">Recipe not found</div>;
  }

  return (
    <div className="recipe-detail">
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div style={styles.header}>
        <img src={recipe.imageUrl} alt={recipe.title} style={styles.image} />
        <div style={styles.info}>
          <h1 style={styles.title}>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div style={styles.metaRow}>
            <div style={styles.box}>⏱️ {recipe.prepTime} min</div>
            <div style={styles.box}>🔥 {recipe.cookTime} min</div>
            <div style={styles.box}>🍽️ {recipe.servings}</div>
            <div style={styles.box}>📊 {recipe.difficulty}</div>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={styles.tag}>{recipe.category}</span>
            <span style={styles.tag}>{recipe.cuisine}</span>
            <span style={styles.tag}>By {recipe.author}</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="ingredients-section">
          <h2 className="section-title">🥘 Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-quantity">{ingredient.quantity}</span>
                <span className="ingredient-name">{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2 className="section-title">👨‍🍳 Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">
                <span className="instruction-step">Step {instruction.step}</span>
                <p className="instruction-text">{instruction.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;