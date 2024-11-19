const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. Invalid token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error.message);
      return res.status(401).json({
        message: 'Token expired. Please refresh your token.',
      });
    }
    console.error('Error verifying token:', error.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
