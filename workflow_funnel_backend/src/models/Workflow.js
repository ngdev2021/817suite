const pool = require('../config/db');

// Create a new workflow
const createWorkflow = async (
  userId,
  name,
  triggers,
  actions,
  status = 'active'
) => {
  if (!userId || !name || !triggers || !actions) {
    throw new Error(
      'Missing required fields for creating a workflow'
    );
  }
  try {
    const query = `
      INSERT INTO workflows (user_id, name, triggers, actions, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, user_id, name, triggers, actions, status, created_at;
    `;
    const values = [userId, name, triggers, actions, status];
    const { rows } = await pool.query(query, values);
    console.log(`Workflow created: ${rows[0].id}`);
    return rows[0];
  } catch (error) {
    console.error('Error creating workflow:', error.message);
    throw error;
  }
};

// Get all workflows for a user with pagination and sorting
const getWorkflowsByUser = async (userId) => {
  const query = `
    SELECT id, name, triggers, actions, status, created_at
    FROM workflows
    WHERE user_id = $1;
  `;
  const { rows } = await pool.query(query, [userId]);

  if (!rows) {
    console.error('No workflows found for user:', userId);
    return []; // Return an empty array instead of undefined
  }

  return rows; // Return rows directly without accessing 'offset'
};

// Get a specific workflow by ID
const getWorkflowById = async (id, userId) => {
  try {
    const query = `
      SELECT id, name, triggers, actions, status, created_at
      FROM workflows
      WHERE id = $1 AND user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching workflow:', error.message);
    throw error;
  }
};

// Update a workflow
const updateWorkflow = async (id, userId, updates) => {
  const { name, triggers, actions, status } = updates;
  try {
    const query = `
      UPDATE workflows
      SET name = COALESCE($1, name),
          triggers = COALESCE($2, triggers),
          actions = COALESCE($3, actions),
          status = COALESCE($4, status)
      WHERE id = $5 AND user_id = $6
      RETURNING id, name, triggers, actions, status, created_at;
    `;
    const values = [name, triggers, actions, status, id, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error updating workflow:', error.message);
    throw error;
  }
};

// Delete a workflow
const deleteWorkflow = async (id, userId) => {
  try {
    const query = `
      DELETE FROM workflows
      WHERE id = $1 AND user_id = $2
      RETURNING id;
    `;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  } catch (error) {
    console.error('Error deleting workflow:', error.message);
    throw error;
  }
};

module.exports = {
  createWorkflow,
  getWorkflowsByUser,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};
