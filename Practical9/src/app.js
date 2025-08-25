const express = require('express');
const homeRoutes = require('./routes/home');

const app = express();

// Middleware for parsing JSON (future proof for APIs)
app.use(express.json());

// Routes
app.use('/', homeRoutes);

module.exports = app;
