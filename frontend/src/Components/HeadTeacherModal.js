import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TeacherModal = ({ isOpen, onRequestClose, onAddTeacher }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: 'male',
    contact: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeacher(formData);
    onRequestClose();
  };

  async function addHeadTeacher() {

    console.log(formData);
    
    const response = await fetch('http://localhost:3000/admin/create-headteacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const createdTeacher = await response.json();
      // addTeacher(createdTeacher);
      // closeModal();
    } else {
      alert('Failed to create headteacher');
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Student"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <label>firstname: <input type="text" name="firstname" onChange={handleInputChange} required /></label>
        <label>middlename: <input type="text" name="middlename" onChange={handleInputChange} required /></label>
        <label>lastname: <input type="text" name="lastname" onChange={handleInputChange} required /></label>
        <label>Gender: 
          <select name="gender" onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>Contact: <input type="tel" name="contact" onChange={handleInputChange} required /></label>
        <label>Email: <input type="email" name="email" onChange={handleInputChange} required /></label>
        <button type="submit" className='btn' onClick={addHeadTeacher}>Add HeadTeacher</button>
      </form>
      <button onClick={onRequestClose} className='btn'>Close</button>
    </Modal>
  );
};

export default TeacherModal;
