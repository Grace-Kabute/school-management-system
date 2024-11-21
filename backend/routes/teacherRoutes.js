import express from 'express';
import { createTeacher } from '../controllers/teacherController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Route to create a teacher
router.post('/create-teacher', verifyToken, createTeacher);

export default router;
