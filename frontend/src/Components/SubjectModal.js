import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SubjectModal = ({ isOpen, onRequestClose, onAddSubject }) => {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    class: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSubject(formData);
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
      <h2>Add New Subject</h2>
      <form onSubmit={handleSubmit}>
        <label>Code: <input type="text" name="index" onChange={handleInputChange} required /></label>
        <label>Title: <input type="text" name="name" onChange={handleInputChange} required /></label>
        <label>Class: <input type="text" name="class" onChange={handleInputChange} required /></label>
        <button type="submit" className='btn'>Add Subject</button>
      </form>
      <button onClick={onRequestClose} className='btn'>Close</button>
    </Modal>
  );
};

export default SubjectModal;