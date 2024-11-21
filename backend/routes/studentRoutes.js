import express from 'express';
import { createStudent } from '../controllers/studentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Route to create a student
// Only accessible by users with 'headteacher' role (checked in the controller)
router.post('/create-student', verifyToken, createStudent);

export default router;
