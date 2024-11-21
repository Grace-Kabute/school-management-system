import React, { useState} from 'react';
import List from '../Components/List';
import HeadTeacherModal from '../Components/HeadTeacherModal'
import '../Components/Components.css'


const HeadTeachersList = () => {
  const [teachers, setTeachers] = useState([
    { name: 'Mr. Red', email: 'Math', contact: 'green@example.com' },
    { name: 'Mrs. Brown', email: 'Science', contact: 'brown@example.com' },
    { name: 'Ms. Green', email: 'English', contact: 'brown@example.com' },
    { name: 'Mr. Yellow', email: 'Geography', contact: 'brown@example.com' },
    { name: 'Mr. White', email: 'Muslim', contact: 'brown@example.com' },
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
        <h2>Head Teachers</h2>
        <button onClick={openModal}>New Head Teacher</button>
      </div>
      <List items={teachers} fields={['name', 'email', 'contact']} />
      <HeadTeacherModal isOpen={isModalOpen} onRequestClose={closeModal} onAddTeacher={addTeacher} />
    </div>
  );
};

export default HeadTeachersList;
