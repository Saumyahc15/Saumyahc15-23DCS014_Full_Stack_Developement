const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON bodies

const dataFile = path.join(__dirname, 'data.json');

// GET current rep count
app.get('/api/count', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read data.' });
    const json = JSON.parse(data);
    res.json({ count: json.count });
  });
});

// POST updated rep count
app.post('/api/count', (req, res) => {
  const { count } = req.body;
  if (typeof count !== 'number' || count < 0) {
    return res.status(400).json({ error: 'Invalid count value.' });
  }

  fs.writeFile(dataFile, JSON.stringify({ count }), (err) => {
    if (err) return res.status(500).json({ error: 'Could not save data.' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
