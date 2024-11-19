const pool = require('../config/db');

// Create a new user
const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
  `;
  const values = [name, email, passwordHash];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
