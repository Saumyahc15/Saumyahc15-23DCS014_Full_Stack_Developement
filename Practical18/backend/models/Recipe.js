const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  ingredients: [{
    name: String,
    quantity: String
  }],
  instructions: [{
    step: Number,
    description: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage']
  },
  cuisine: {
    type: String,
    required: true
  },
  prepTime: {
    type: Number,
    required: true
  },
  cookTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800'
  },
  author: {
    type: String,
    default: 'Anonymous Chef'
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);