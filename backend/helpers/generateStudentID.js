import Student from '../models/student.js';  // Import the correct Student model

export const generateStudentID = async () => {
  try {
    // Get the current year (last two digits)
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const prefix = `STU${currentYear}`;

    // Find the latest student by creation date
    const latestStudent = await Student.findOne({
      order: [['createdAt', 'DESC']], // Orders by the most recently created student
    });

    // Set default ID number if no student exists
    let newIDNumber = '0001';

    // If there's a latest student, extract the last ID and increment it
    if (latestStudent) {
      const lastIDNumber = parseInt(latestStudent.studentID.slice(-4), 10);
      newIDNumber = (lastIDNumber + 1).toString().padStart(4, '0'); // Increment and pad with leading zeros
    }

    // Check if the generated student ID already exists in the database
    let existingStudent = await Student.findOne({
      where: { studentID: `${prefix}${newIDNumber}` },
    });

    // If the ID exists, increment until a unique ID is found
    while (existingStudent) {
      newIDNumber = (parseInt(newIDNumber, 10) + 1).toString().padStart(4, '0');
      existingStudent = await Student.findOne({
        where: { studentID: `${prefix}${newIDNumber}` },
      });
    }

    // Return the new student ID with the prefix
    return `${prefix}${newIDNumber}`;
  } catch (error) {
    console.error('Error generating student ID:', error);
    throw new Error('Error generating student ID');
  }
};
