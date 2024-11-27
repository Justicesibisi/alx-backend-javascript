const express = require('express');

// Create Express application
const app = express();

// Define route for the '/' endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

// Start server on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
