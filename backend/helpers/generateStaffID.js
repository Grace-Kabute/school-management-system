import User from '../models/user.js';

export const generateStaffID = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const prefix = `STA${currentYear}`;

  // Find the latest staff ID
  const latestHeadteacher = await User.findOne({
    where: { role: ['headteacher', 'teacher'] },
    order: [['createdAt', 'DESC']],
  });

  let newIDNumber = '0001'; // Default if no headteacher exists

  if (latestHeadteacher) {
    const lastIDNumber = parseInt(latestHeadteacher.staffID.slice(-4), 10);
    newIDNumber = (lastIDNumber + 1).toString().padStart(4, '0');
  }

  return `${prefix}${newIDNumber}`;
};
