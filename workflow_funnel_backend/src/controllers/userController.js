const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
require('dotenv').config();
const pool = require('../config/db');
const hash = bcrypt.hashSync('password123', 10);
console.log(hash);

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  }); // Short-lived token
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  }); // Longer-lived token
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(userQuery, [email]);
    const user = rows[0];
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save refresh token in the database
    const updateQuery =
      'UPDATE users SET refresh_token = $1 WHERE id = $2';
    await pool.query(updateQuery, [refreshToken, user.id]);

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
