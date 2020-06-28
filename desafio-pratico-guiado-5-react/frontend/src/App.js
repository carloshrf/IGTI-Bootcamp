import React from 'react';
import * as api from './api/apiService';

export default function App() {

  const testApi = async () => {
    const result = await api.getAllGrades();

    const grades = result.data.grades.map(grade => {
      const { student, subject, type } = grade;
      
      return {
        ...grade,
        studentLowerCase: student.toLowerCase(),
        subjectLowerCase: subject.toLowerCase(),
        typeLowerCase: type.toLowerCase(),
        isDeleted: false,
      }
    });

    let allStudents = new Set();
    grades.forEach(grade => allStudents.add(grade.student));

    allStudents = Array.from(allStudents);
    
    let allSubjects = new Set();
    grades.forEach(grade => allSubjects.add(grade.subject));

    allSubjects = Array.from(allSubjects);

    let allGradeTypes = new Set();
    grades.forEach(grade => allGradeTypes.add(grade.type));

    allGradeTypes = Array.from(allGradeTypes);

    const allCombinations = [];
    allStudents.forEach(student => {
      allSubjects.forEach(subject => {
        allGradeTypes.forEach(type => {
          allCombinations.push({
            student,
            subject,
            type,
          });
        });
      });
    });

    let maxId = -1;
    grades.forEach(({id}) => {
      if (id > maxId) {
        maxId = id;
      }
    });

    let nextId = grades.length + 1;
    allCombinations.forEach(({student, subject, type}) => {
      const hasItem = grades.find(grade => {
        return grade.subject === subject && grade.student === student && grade.type === type;
      });

      if (!hasItem) {
        grades.push({
          id: nextId++,
          student,
          studentLowerCase: student.toLowerCase(),
          subject,
          subjectLowerCase: subject.toLowerCase(),
          type,
          typeLowerCase: type.toLowerCase(),
          value: 0,
          isDeleted: true,
        });
      }
    });

    grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
    grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
    grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

    return grades;
  }

  testApi();

  return <p>foi</p>;

}
