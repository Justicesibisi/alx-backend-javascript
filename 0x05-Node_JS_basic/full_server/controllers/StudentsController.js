import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const databasePath = process.argv[2];
      const studentsByField = await readDatabase(databasePath);
      const fields = Object.keys(studentsByField).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      const response = ['This is the list of our students'];

      fields.forEach((field) => {
        const students = studentsByField[field];
        const count = students.length;
        const firstNames = students.join(', ');
        response.push(`Number of students in ${field}: ${count}. List: ${firstNames}`);
      });

      res.status(200).send(response.join('\n'));
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const databasePath = process.argv[2];
      const studentsByField = await readDatabase(databasePath);
      const major = req.query.major.toUpperCase();

      if (major !== 'CS' && major !== 'SWE') {
        return res.status(500).send('Major parameter must be CS or SWE');
      }

      if (!studentsByField[major]) {
        return res.status(200).send(`No students found for major ${major}`);
      }

      const students = studentsByField[major];
      const firstNames = students.join(', ');

      res.status(200).send(`List: ${firstNames}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot load the database');
    }

    return null;
  }
}

export default StudentsController;