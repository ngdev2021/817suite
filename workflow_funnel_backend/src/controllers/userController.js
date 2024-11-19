const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // PostgreSQL connection pool
require('dotenv').config();

// Generate Access Token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m', // Short-lived token
  });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', // Longer-lived token
  });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await pool.query(
      'UPDATE users SET refresh_token = $1 WHERE id = $2',
      [refreshToken, user.id]
    );

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register Controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required' });
    }

    const userExists = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(409)
        .json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Refresh Token Controller
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: 'Refresh token is required' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Fetch user from the database to confirm token validity
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND refresh_token = $2',
      [decoded.id, refreshToken]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(403)
        .json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(decoded.id);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: 'Refresh token is required' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Mark the user's refresh token as invalid
    await pool.query(
      'UPDATE users SET refresh_token = NULL WHERE id = $1',
      [decoded.id]
    );

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' });
  }
};
