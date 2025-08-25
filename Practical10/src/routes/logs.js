const express = require('express');
const { viewLogs } = require('../controllers/logController');

const router = express.Router();

// Route to display logs
router.get('/', viewLogs);

module.exports = router;
