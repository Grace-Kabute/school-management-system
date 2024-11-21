import React, { useState } from 'react';
import List from '../Components/List';

const Performance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', class: 'Grade 6'},
    { id: 2, name: 'Bob Smith', class: 'Grade 6'},
    { id: 3, name: 'Wise Duho', class: 'Grade 6'},
    { id: 4, name: 'Kabute Grace', class: 'Grade 6'},
    { id: 5, name: 'Mercy Joe', class: 'Grade 6'},
  ]);

  const handleChange = (id, examType, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              [examType]: Number(value),
              average: ((student.openerExam + student.midTerm + student.EndTerm) / 3).toFixed(2),
            }
          : student
      )
    );
  };

  const updatePerformance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(students),
      });
      if (response.ok) {
        alert("Data updated successfully!");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <h2>Performance</h2>
        <button onClick={updatePerformance}>Update</button>
      </div>
      <table className='performance-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Opener Exam</th>
            <th>Mid Term</th>
            <th>End Term</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>
                <input 
                  type="text"
                  value={student.openerExam} 
                  onChange={(e) => handleChange(student.id, 'openerExam', e.target.value)} 
                />
              </td>
              <td>
                <input 
                  type="text" 
                  value={student.midTerm} 
                  onChange={(e) => handleChange(student.id, 'midTerm', e.target.value)} 
                />
              </td>
              <td>
                <input 
                  type="text" 
                  value={student.EndTerm} 
                  onChange={(e) => handleChange(student.id, 'EndTerm', e.target.value)} 
                />
              </td>
              <td>{((student.openerExam + student.midTerm + student.EndTerm) / 3).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
