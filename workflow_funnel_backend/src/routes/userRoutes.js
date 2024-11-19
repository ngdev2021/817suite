const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: 'Refresh token required' });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Check if the refresh token matches the one in the database
    const query =
      'SELECT * FROM users WHERE id = $1 AND refresh_token = $2';
    const { rows } = await pool.query(query, [
      decoded.id,
      refreshToken,
    ]);
    const user = rows[0];

    if (!user)
      return res
        .status(401)
        .json({ message: 'Invalid refresh token' });

    // Generate new access token
    const newAccessToken = generateAccessToken(user.id);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res
      .status(401)
      .json({ message: 'Invalid or expired refresh token' });
  }
});

module.exports = router;
