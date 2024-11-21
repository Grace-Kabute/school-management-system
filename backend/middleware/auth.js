import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required.' });
  }

  try {
    console.log('Token received:', token);
    // Decode the token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Ensure the token format is correct (splitting 'Bearer' and token)
    console.log('Decoded token:', decoded);

    // Find the user by ID
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach user to the request object
    req.user = user;
    
    // Continue to the next middleware or controller
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};
