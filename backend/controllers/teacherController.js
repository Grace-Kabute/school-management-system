import User from '../models/user.js';
import { generateStaffID } from '../helpers/generateStaffID.js';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import validClasses from '../helpers/validClasses.js';

export const createTeacher = async (req, res) => {
  try {
    const { firstname, middlename, lastname, gender, contact, email, class: teacherClass } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !gender || !contact || !email || !teacherClass) {
      return res.status(400).json({ message: 'All fields except middlename are required.' });
    }

    // Validate gender to be either "male" or "female"
    if (!['male', 'female'].includes(gender.toLowerCase())) {
      return res.status(400).json({ message: 'Gender must be either "male" or "female".' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate that the teacher is assigned to a valid class
    if (!validClasses.includes(teacherClass)) {
      return res.status(400).json({ message: `Class must be one of the following: ${validClasses.join(', ')}` });
    }

    // Check if the logged-in user is a headteacher
    const loggedInUser = await User.findByPk(req.user.id);  // Assuming req.user.id is set by the verifyToken middleware

    if (loggedInUser.role !== 'headteacher') {
      return res.status(403).json({ message: 'Only a headteacher can create teachers.' });
    }

    // Generate temporary password and hashed password
    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Generate a unique staff ID
    const staffID = await generateStaffID();

    // Create the teacher user in the database
    const teacher = await User.create({
      firstname,
      middlename,
      lastname,
      class: teacherClass,
      gender,
      contact,
      email,
      password: hashedPassword,
      role: 'teacher',
      isActive: true,
      staffID,
      needsPasswordChange: true,
    });

    res.status(201).json({
      message: 'Teacher created successfully.',
      teacher: {
        firstname: teacher.firstname,
        middlename: teacher.middlename,
        lastname: teacher.lastname,
        staffID: teacher.staffID,
        role: teacher.role,
        needsPasswordChange: teacher.needsPasswordChange,
      },
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Error creating teacher.' });
  }
};
