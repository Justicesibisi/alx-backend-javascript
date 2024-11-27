
const http = require('http');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

// Create HTTP server
const app = http.createServer(async (req, res) => {
  try {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Determine request URL path
    const { url } = req;

    // Handle requests based on URL path
    if (url === '/') {
      res.end('Hello Holberton School!\n');
    } else if (url === '/students') {
      // Read the database file asynchronously
      const data = await readFileAsync(process.argv[2], 'utf8');

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

      // Log number of students and their details
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
      res.end(`${response.join('\n')}\n`);
    } else {
      // Send 404 Not Found for other endpoints
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found\n');
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
