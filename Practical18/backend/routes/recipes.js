const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const { category, cuisine, difficulty, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (cuisine) query.cuisine = cuisine;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create recipe
router.post('/', async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update recipe
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like recipe
router.patch('/:id/like', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;