import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateStaffID } from '../helpers/generateStaffID.js';
import { generateTemporaryPassword } from '../helpers/generateTemporaryPassword.js';
import validator from 'validator';

const router = express.Router();

// Route to create headteacher
router.post('/create-headteacher', async (req, res) => {
  try {
    const { firstname, middlename, lastname, gender, contact, email } = req.body;

    // Log req.body for debugging
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!firstname || !lastname || !gender || !contact || !email) {
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

    // Find the active super admin
    const superAdmin = await User.findOne({ where: { role: 'super-admin', superAdminActive: true } });
    if (!superAdmin) {
      return res.status(403).json({ message: 'Super Admin access required to create a headteacher.' });
    }

    // Generate a unique staffID for the headteacher
    const staffID = await generateStaffID();

    // Generate a temporary password for the headteacher
    const temporaryPassword = generateTemporaryPassword();

    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create the headteacher user with active status and needsPasswordChange flag
    const headteacher = await User.create({
      firstname,
      middlename,
      lastname,
      gender,
      contact,
      email,
      password: hashedPassword,
      role: 'headteacher',
      isActive: true,
      staffID,
      needsPasswordChange: true,
    });

    // Send response with created headteacher details and temporary password
    res.status(201).json({
      message: 'Headteacher created successfully.',
      headteacher: {
        firstname: headteacher.firstname,
        middlename: headteacher.middlename,
        lastname: headteacher.lastname,
        gender: headteacher.gender,
        contact: headteacher.contact,
        email: headteacher.email,
        staffID: headteacher.staffID,
        role: headteacher.role,
        isActive: headteacher.isActive,
        temporaryPassword // Including temporary password in response
      },
    });
  } catch (error) {
    console.error('Error creating headteacher:', error);
    res.status(500).json({ message: 'Error creating headteacher.' });
  }
});

export default router;
