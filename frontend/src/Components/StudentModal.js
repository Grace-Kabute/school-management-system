import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const StudentModal = ({ isOpen, onRequestClose, onAddStudent }) => {
  const [formData, setFormData] = useState({
    index: '',
    name: '',
    class: '',
    contact: '',
    gender: '',
    dob: '',
    guardianName: '',
    guardianContact: '',
    altContact: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Student"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Index: <input type="text" name="index" onChange={handleInputChange} required /></label>
        <label>Name: <input type="text" name="name" onChange={handleInputChange} required /></label>
        <label>Class: <input type="text" name="class" onChange={handleInputChange} required /></label>
        <label>Contact: <input type="tel" name="contact" onChange={handleInputChange} required /></label>
        <label>Gender: 
          <select name="gender" onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>Date of Birth: <input type="date" name="dob" onChange={handleInputChange} required /></label>
        <label>Guardian's Name: <input type="text" name="guardianName" onChange={handleInputChange} required /></label>
        <label>Guardian's Contact: <input type="tel" name="guardianContact" onChange={handleInputChange} required /></label>
        <label>Alternate Contact: <input type="tel" name="altContact" onChange={handleInputChange} /></label>
        <label>Photo: <input type="file" onChange={handleFileChange} /></label>
        <button type="submit" className='btn'>Add Student</button>
      </form>
      <button onClick={onRequestClose} className='btn'>Close</button>
    </Modal>
  );
};

export default StudentModal;
