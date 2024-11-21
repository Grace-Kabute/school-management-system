import React, { useState } from 'react';
import List from '../Components/List';

const AttendanceList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', class: 'Grade 6', isPresent: false },
    { id: 2, name: 'Bob Smith', class: 'Grade 6', isPresent: false },
    { id: 3, name: 'Wise Duho', class: 'Grade 6', isPresent: false },
    { id: 4, name: 'Kabute Grace', class: 'Grade 6', isPresent: false },
    { id: 5, name: 'Mercy Joe', class: 'Grade 6', isPresent: false },
  ]);

  const fields = ['name', 'class', 'attendance'];

  const handleAttendanceChange = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const updateAttendance = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(students),
      });
      if (response.ok) {
        alert("Attendance updated successfully!");
      } else {
        console.error("Failed to update attendance");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className='wrapper'>
      <div className="container">
        <h2>Student Attendance List</h2>
        <button onClick={updateAttendance}>Update</button>
      </div>
      <List items={students} fields={fields} onAttendanceChange={handleAttendanceChange} />
    </div>
  );
};

export default AttendanceList;
