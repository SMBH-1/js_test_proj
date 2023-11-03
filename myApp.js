// Import required modules and create an Express application
const express = require('express');
const app = express();

// Define absolute paths for files and assets
const absolutePath = __dirname + '/views/index.html';
const assetsFldrAbsPath = __dirname + '/public';

// Middleware to set mySecret based on an environment variable
app.use((req, res, next) => {
  const mySecret = process.env['MESSAGE_STYLE'];
  next();
});

// Route Handlers

// Handler for the '/json' route
function jsonHandler(req, res) {
  if (mySecret === 'uppercase') {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({ "message": "Hello json" });
  }
}

// Handler for the '/' route
function homeHandler(req, res) {
  res.sendFile(absolutePath);
}

// Routes

// Define a route for the home page
app.get('/', homeHandler);

// Define a route for JSON data
app.get('/json', jsonHandler);

// Serve static assets from the '/public' directory
app.use('/public', express.static(assetsFldrAbsPath));
