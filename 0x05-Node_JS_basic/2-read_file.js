const fs = require('fs');

function countStudents(path) {
  try {
    // Read the database file synchronously
    const data = fs.readFileSync(path, 'utf8').split('\n').filter((line) => line !== '');

    if (data.length === 0) {
      throw new Error('Cannot load the database');
    }

    const totalStudents = data.length - 1;

    const studentsByField = {};
    const firstNamesByField = {};

    // Iterate over each record in the database
    /* eslint-disable-next-line no-plusplus */
    for (let i = 1; i < data.length; i++) {
      const fields = data[i].split(',');
      const field = fields[3].trim();
      const firstName = fields[0].trim();

      studentsByField[field] = (studentsByField[field] || 0) + 1;

      firstNamesByField[field] = (firstNamesByField[field] || []).concat(firstName);
    }

    // Log the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field and their first names
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        const count = studentsByField[field];
        const firstNames = firstNamesByField[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${firstNames}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
