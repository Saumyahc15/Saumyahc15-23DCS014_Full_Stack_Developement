const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Log Viewer running on http://localhost:${PORT}`);
});
