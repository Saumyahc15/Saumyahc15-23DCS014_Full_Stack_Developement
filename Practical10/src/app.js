const express = require('express');
const logRoutes = require('./routes/logs');

const app = express();

// Routes
app.use('/', logRoutes);

module.exports = app;
