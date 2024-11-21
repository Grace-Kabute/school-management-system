import React, { useState } from 'react';
import List from '../Components/List';
import SubjectModal from '../Components/SubjectModal';


const SubjectsList = () => {
  const [subjects, setSubjects] = useState([
    { code: 1, title: 'Math', teacher: 'Mr. Red' },
    { code: 2, title: 'Science', teacher: 'Mrs. Brown' },
    { code: 2, title: 'English', teacher: 'Ms. Green' },
    { code: 2, title: 'Geography', teacher: 'Mr. Yellow' },
    { code: 2, title: 'Muslim', teacher: 'Mr. White' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const addSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };
  return (
    <div className='wrapper'>
      <div className="container">
        <h2>Subjects</h2>
        <button onClick={openModal}>New subject</button>
      </div>
      <List items={subjects} fields={['code', 'title', 'teacher']} />
      <SubjectModal isOpen={isModalOpen} onRequestClose={closeModal} onAddSubject={addSubject} />
    </div>
  );
};

export default SubjectsList;
