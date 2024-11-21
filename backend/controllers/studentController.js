import Student from '../models/student.js';
import User from '../models/user.js'; // Import the User model for authorization check
import { generateStudentID } from '../helpers/generateStudentID.js';
import validator from 'validator';
import validClasses from '../helpers/validClasses.js';

export const createStudent = async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      gender,
      dob, // Date of birth
      class: studentClass,
      parentFirstname,
      parentMiddlename,
      parentLastname,
      parentContact,
      parentEmail,
    } = req.body;

    if (!firstname || !lastname || !gender || !dob || !studentClass) {
      return res.status(400).json({ message: 'First name, last name, gender, date of birth, and class are required.' });
    }

    if (!['male', 'female'].includes(gender.toLowerCase())) {
      return res.status(400).json({ message: 'Gender must be either "male" or "female".' });
    }

    if (!validClasses.includes(studentClass)) {
      return res.status(400).json({ message: `Class must be one of the following: ${validClasses.join(', ')}` });
    }

    if (parentContact && !validator.isMobilePhone(parentContact)) {
      return res.status(400).json({ message: 'Invalid parent contact format.' });
    }

    if (parentEmail && !validator.isEmail(parentEmail)) {
      return res.status(400).json({ message: 'Invalid parent email format.' });
    }

    const loggedInUser = await User.findByPk(req.user.id);

    if (loggedInUser.role !== 'headteacher') {
      return res.status(403).json({ message: 'Only a headteacher can create students.' });
    }

    const studentID = await generateStudentID();

    const student = await Student.create({
      firstname,
      middlename,
      lastname,
      dob,
      class: studentClass,
      gender,
      role: 'student',
      isActive: true,
      studentID,
      parentFirstname,
      parentMiddlename,
      parentLastname,
      parentContact,
      parentEmail,
    });

    // Assign subjects based on the class
    const subjects = classSubjects[studentClass] || [];
    await Promise.all(subjects.map(subjectName => 
      Subject.create({
        name: subjectName,
        class: studentClass,
        studentId: student.id, // Assuming a foreign key realtionship
      })
    ));

    res.status(201).json({
      message: 'Student created successfully.',
      student: {
        firstname: student.firstname,
        middlename: student.middlename,
        lastname: student.lastname,
        studentID: student.studentID,
        role: student.role,
        parentDetails: {
          firstname: student.parentFirstname,
          middlename: student.parentMiddlename,
          lastname: student.parentLastname,
          contact: student.parentContact,
          email: student.parentEmail,
        },
      },
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Error creating student.' });
  }
};
