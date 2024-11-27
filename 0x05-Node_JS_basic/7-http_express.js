const express = require('express');
const { readFile } = require('fs').promises;

// Create Express application
const app = express();

// Define route for the '/' endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

// Define route for the '/students' endpoint
app.get('/students', async (req, res) => {
  try {
    // Read the database file asynchronously
    const data = await readFile(process.argv[2], 'utf8');

    const lines = data.trim().split('\n').filter((line) => line.trim() !== '');

    const totalStudents = lines.length - 1;

    const studentsByField = {};
    const firstNamesByField = {};

    /* eslint-disable no-plusplus */
    for (let i = 1; i < lines.length; i++) {
      const fields = lines[i].split(',');
      const field = fields[3].trim();
      const firstName = fields[0].trim();

      // Increment count for the field
      studentsByField[field] = (studentsByField[field] || 0) + 1;

      // Store first name for the field
      firstNamesByField[field] = (firstNamesByField[field] || []).concat(firstName);
    }

    // Prepare response body
    const response = [];
    response.push('This is the list of our students');
    response.push(`Number of students: ${totalStudents}`);
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        const count = studentsByField[field];
        const firstNames = firstNamesByField[field].join(', ');
        response.push(`Number of students in ${field}: ${count}. List: ${firstNames}`);
      }
    }

    // Send response body for '/students' endpoint
    res.send(`${response.join('\n')}\n`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error\n');
  }
});

// Start server on port 1245
const port = 1245;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
