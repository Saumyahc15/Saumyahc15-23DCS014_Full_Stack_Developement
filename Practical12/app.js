const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware (use built-in parsers instead of body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

// Serve calculator page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Handle calculation
app.post("/calculate", (req, res) => {
  let { num1, num2, operation } = req.body;

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.json({ error: "Please enter valid numbers." });
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return res.json({ error: "Cannot divide by zero." });
      }
      result = num1 / num2;
      break;
    default:
      return res.json({ error: "Unknown operation." });
  }

  res.json({ result });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
