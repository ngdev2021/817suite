const {
  createFunnel,
  getFunnelsByUser,
  getFunnelById,
  updateFunnel,
  deleteFunnel,
} = require('../models/Funnel');

// Create a new funnel
const create = async (req, res) => {
  const { name, steps, analytics } = req.body;
  const userId = req.user.id;

  try {
    if (!name || !steps) {
      return res
        .status(400)
        .json({ message: 'Name and steps are required' });
    }
    const funnel = await createFunnel(
      userId,
      name,
      steps,
      analytics || {}
    );
    res.status(201).json({ funnel });
  } catch (error) {
    console.error('Error creating funnel:', error);
    res.status(500).json({ message: 'Failed to create funnel' });
  }
};

// Get all funnels for the authenticated user
const getAll = async (req, res) => {
  const userId = req.user.id;

  try {
    const funnels = await getFunnelsByUser(userId);
    res.status(200).json({ funnels });
  } catch (error) {
    console.error('Error fetching funnels:', error);
    res.status(500).json({ message: 'Failed to fetch funnels' });
  }
};

// Get a specific funnel by ID
const getById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const funnel = await getFunnelById(id, userId);
    if (!funnel) {
      return res.status(404).json({ message: 'Funnel not found' });
    }
    res.status(200).json({ funnel });
  } catch (error) {
    console.error('Error fetching funnel:', error);
    res.status(500).json({ message: 'Failed to fetch funnel' });
  }
};

// Update a funnel
const update = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Authenticated user ID
  const updates = req.body;

  try {
    const updatedFunnel = await updateFunnel(id, userId, updates);
    if (!updatedFunnel) {
      return res.status(404).json({ message: 'Funnel not found' });
    }
    res.status(200).json({ funnel: updatedFunnel });
  } catch (error) {
    console.error('Error updating funnel:', error);
    res.status(500).json({ message: 'Failed to update funnel' });
  }
};

module.exports = { update };

// Delete a funnel
const remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedFunnel = await deleteFunnel(id, userId);
    if (!deletedFunnel) {
      return res.status(404).json({ message: 'Funnel not found' });
    }
    res.status(200).json({ message: 'Funnel deleted successfully' });
  } catch (error) {
    console.error('Error deleting funnel:', error);
    res.status(500).json({ message: 'Failed to delete funnel' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
