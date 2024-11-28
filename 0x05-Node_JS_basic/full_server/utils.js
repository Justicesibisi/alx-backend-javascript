import fs from 'fs';

// Function to read the database asynchronously
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      // Process the data to extract first names per field
      const lines = data.trim().split('\n').filter((line) => line.trim() !== '');
      const studentsByField = {};

      /* eslint-disable no-plusplus */
      for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(',');
        const firstName = fields[0].trim();
        const field = fields[3].trim();

        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }

        studentsByField[field].push(firstName);
      }

      resolve(studentsByField);
    }
  });
});

export default readDatabase;
