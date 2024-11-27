const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the database file asynchronously
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n').filter((line) => line.trim() !== '');

        // Calculate total number of students
        const totalStudents = lines.length - 1; // Exclude header

        // Initialize objects to store counts and first names
        const studentsByField = {};
        const firstNamesByField = {};

        // Iterate over each line to count students in each field
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
        console.log(`Number of students: ${totalStudents}`);
        for (const field in studentsByField) {
          if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
            const count = studentsByField[field];
            const firstNames = firstNamesByField[field].join(', ');
            console.log(`Number of students in ${field}: ${count}. List: ${firstNames}`);
          }
        }

        resolve();
      }
    });
  });
}

module.exports = countStudents;
