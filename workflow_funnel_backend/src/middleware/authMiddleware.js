const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('Authorization header missing');
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token); // Log the extracted token

  if (!token) {
    console.log('Token missing from Authorization header');
    return res
      .status(401)
      .json({ message: 'Access denied. Invalid token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    console.log('Token verified successfully:', decoded);
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
