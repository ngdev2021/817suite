const pool = require('../config/db');

// Create a new funnel
const createFunnel = async (userId, name, steps, analytics) => {
  if (!userId || !name || !steps || !analytics) {
    throw new Error('Missing required fields for creating a funnel');
  }
  try {
    const query = `
      INSERT INTO funnels (user_id, name, steps, analytics)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, name, steps, analytics, created_at;
    `;
    const values = [userId, name, steps, analytics];
    const { rows } = await pool.query(query, values);
    console.log(`Funnel created: ${rows[0].id}`);
    return rows[0];
  } catch (error) {
    console.error('Error creating funnel:', error.message);
    throw error;
  }
};

// Get all funnels for a user with pagination and sorting
const getFunnelsByUser = async (userId) => {
  const query = `
    SELECT id, name, steps, analytics, created_at
    FROM funnels
    WHERE user_id = $1;
  `;
  const { rows } = await pool.query(query, [userId]);

  if (!rows) {
    console.error('No funnels found for user:', userId);
    return []; // Return an empty array instead of undefined
  }

  return rows; // Return rows directly without accessing 'offset'
};

// Get a specific funnel by ID
const getFunnelById = async (id, userId) => {
  try {
    const query = `
      SELECT id, name, steps, analytics, created_at
      FROM funnels
      WHERE id = $1 AND user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching funnel:', error.message);
    throw error;
  }
};

// Update a funnel
const updateFunnel = async (id, userId, updates) => {
  const { name, steps, analytics } = updates;
  try {
    const query = `
      UPDATE funnels
      SET name = COALESCE($1, name),
          steps = COALESCE($2, steps),
          analytics = COALESCE($3, analytics)
      WHERE id = $4 AND user_id = $5
      RETURNING id, name, steps, analytics, created_at;
    `;
    const values = [name, steps, analytics, id, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error updating funnel:', error.message);
    throw error;
  }
};

// Delete a funnel
const deleteFunnel = async (id, userId) => {
  try {
    const query = `
      DELETE FROM funnels
      WHERE id = $1 AND user_id = $2
      RETURNING id;
    `;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  } catch (error) {
    console.error('Error deleting funnel:', error.message);
    throw error;
  }
};

module.exports = {
  createFunnel,
  getFunnelsByUser,
  getFunnelById,
  updateFunnel,
  deleteFunnel,
};
