// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// ---------- Configure Multer ---------- //

// Set storage destination & filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File type filter (only PDFs)
function fileFilter(req, file, cb) {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (fileExt === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
}

// Set upload limits (2MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: fileFilter,
});

// ---------- Routes ---------- //

app.get("/", (req, res) => {
  res.send(`
    <h2>Job Portal Resume Upload</h2>
    <form action="/upload" enctype="multipart/form-data" method="POST">
      <input type="file" name="resume" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Handle resume upload
app.post("/upload", upload.single("resume"), (req, res) => {
  res.send("✅ File uploaded successfully: " + req.file.filename);
});

// Error handling middleware (for multer errors)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).send("❌ File too large! Max size is 2MB.");
    } else {
      res.status(400).send("❌ Upload error: " + err.message);
    }
  } else if (err) {
    res.status(400).send("❌ Error: " + err.message);
  } else {
    next();
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
