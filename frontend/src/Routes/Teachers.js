import React, { useState } from 'react';
import List from '../Components/List';
import TeacherModal from '../Components/TeacherModal'
import '../Components/Components.css'


const TeachersList = () => {
  const [teachers, setTeachers] = useState([
    { code: 1, name: 'Mr. Red', class: 'Class 3', email: 'green@example.com' },
    { code: 2, name: 'Mrs. Brown', class: 'Class 8', email: 'brown@example.com' },
    { code: 2, name: 'Ms. Green', class: 'Class 4', email: 'brown@example.com' },
    { code: 2, name: 'Mr. Yellow', class: 'Class 5', email: 'brown@example.com' },
    { code: 2, name: 'Mr. White', class: 'Class 6', email: 'brown@example.com' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const addTeacher = (newTeacher) => {
    setTeachers([...teachers, newTeacher]);
  };
  return (
    <div className='wrapper'>
      <div className="container">
        <h2>Teachers</h2>
        <button onClick={openModal}>New Teacher</button>
      </div>
      <List items={teachers} fields={['code', 'name', 'class', 'email']} />
      <TeacherModal isOpen={isModalOpen} onRequestClose={closeModal} onAddTeacher={addTeacher} />
    </div>
  );
};

export default TeachersList;
