import React, { useState } from 'react';
import List from '../Components/List';
import StudentModal from '../Components/StudentModal';
import '../Components/Components.css';
import './Routes.css';

const StudentsList = () => {
  const [students, setStudents] = useState([
    { index: 1, name: 'Alice Johnson', class: 'Grade 6', contact: '0715963302', gender: 'male' },
    { index: 2, name: 'Bob Smith', class: 'Grade 6', contact: '0715963302', gender: 'female' },
    { index: 3, name: 'Wise Duho', class: 'Grade 6', contact: '0715963302', gender: 'male' },
    { index: 4, name: 'Kabute Grace', class: 'Grade 6', contact: '0715963302', gender: 'female' },
    { index: 5, name: 'Mercy Joe', class: 'Grade 6', contact: '0715963302', gender: 'male' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className='wrapper'>
      <div className="container">
        <h2>Students</h2>
        {/* <button onClick={openModal}>Students</button> */}
        <button onClick={openModal}>New Student</button>
      </div>
      <List items={students} fields={['index', 'name', 'class', 'contact', 'gender']} />
      <StudentModal isOpen={isModalOpen} onRequestClose={closeModal} onAddStudent={addStudent} />
    </div>
  );
};

export default StudentsList;