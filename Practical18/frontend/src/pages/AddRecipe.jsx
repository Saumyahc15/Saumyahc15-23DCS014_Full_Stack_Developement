import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
// removed missing AddRecipe.css import; using App.css base styles

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Dinner',
    cuisine: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    imageUrl: '',
    author: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: [{ step: 1, description: '' }]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }]
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index].description = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: formData.instructions.length + 1, description: '' }]
    });
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions
      .filter((_, i) => i !== index)
      .map((inst, i) => ({ ...inst, step: i + 1 }));
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRecipe(formData);
      navigate('/');
    } catch (error) {
      alert('Error creating recipe: ' + error.message);
    }
  };

  return (
    <div className="add-recipe-page">
      <div className="container">
        <h1 className="page-title">Add New Recipe 🍳</h1>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <input
                type="text"
                name="title"
                placeholder="Recipe Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="author"
                placeholder="Your Name"
                value={formData.author}
                onChange={handleChange}
                className="form-input"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
              </select>
              <input
                type="text"
                name="cuisine"
                placeholder="Cuisine (e.g., Italian, Indian)"
                value={formData.cuisine}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="prepTime"
                placeholder="Prep Time (minutes)"
                value={formData.prepTime}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="cookTime"
                placeholder="Cook Time (minutes)"
                value={formData.cookTime}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="servings"
                placeholder="Servings"
                value={formData.servings}
                onChange={handleChange}
                required
                className="form-input"
              />
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={handleChange}
                className="form-input full-width"
              />
            </div>
            <textarea
              name="description"
              placeholder="Recipe Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-section">
            <h2>Ingredients</h2>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-input-group">
                <input
                  type="text"
                  placeholder="Quantity (e.g., 2 cups)"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  required
                  className="form-input"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="add-btn">
              + Add Ingredient
            </button>
          </div>

          <div className="form-section">
            <h2>Instructions</h2>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instruction-input-group">
                <span className="step-number">Step {instruction.step}</span>
                <textarea
                  placeholder="Describe this step..."
                  value={instruction.description}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  required
                  className="form-textarea"
                  rows="3"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addInstruction} className="add-btn">
              + Add Step
            </button>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;