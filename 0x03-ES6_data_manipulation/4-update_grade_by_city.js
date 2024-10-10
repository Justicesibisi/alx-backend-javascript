function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter(student => student.location === city)  // Step 1: Filter students by the city
    .map(student => {
      // Step 2: Find the new grade for the student by matching studentId
      const studentGrade = newGrades.find(gradeObj => gradeObj.studentId === student.id);
      
      // Step 3: Return the student object with the updated grade or 'N/A'
      return {
        ...student,
        grade: studentGrade ? studentGrade.grade : 'N/A',  // Add the grade or set 'N/A'
      };
    });
}

export default updateStudentGradeByCity;
