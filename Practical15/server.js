// server.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// ---------- Middleware ----------
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session
app.use(
  session({
    secret: "library_secret_key", // keep secret in env file in real apps
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);

// ---------- Routes ---------- //

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Handle login
app.post("/login", (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.send("Please enter a name!");
  }

  // Create session
  req.session.user = {
    name: username,
    loginTime: new Date().toLocaleString(),
  };

  res.redirect("/profile");
});

// Profile page
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  // Read the HTML and inject user info
  fs.readFile(path.join(__dirname, "views", "profile.html"), "utf8", (err, data) => {
    if (err) return res.send("Error loading page");

    const page = data
      .replace("{{name}}", req.session.user.name)
      .replace("{{time}}", req.session.user.loginTime);

    res.send(page);
  });
});

// Handle logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Error logging out");
    res.sendFile(path.join(__dirname, "views", "logout.html"));
  });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Library Portal running at http://localhost:${PORT}`);
});
