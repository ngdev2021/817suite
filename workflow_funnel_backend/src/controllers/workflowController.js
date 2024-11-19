const {
  createWorkflow,
  getWorkflowsByUser,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
} = require('../models/Workflow');

// Create a new workflow
const create = async (req, res) => {
  const { name, triggers, actions, status } = req.body;
  const userId = req.user.id;

  try {
    if (!name || !triggers || !actions) {
      return res.status(400).json({
        message: 'Name, triggers, and actions are required',
      });
    }
    const workflow = await createWorkflow(
      userId,
      name,
      triggers,
      actions,
      status || 'active'
    );
    res.status(201).json({ workflow });
  } catch (error) {
    console.error('Error creating workflow:', error);
    res.status(500).json({ message: 'Failed to create workflow' });
  }
};

// Get all workflows for the authenticated user
const getAll = async (req, res) => {
  const userId = req.user.id;

  try {
    const workflows = await getWorkflowsByUser(userId);
    res.status(200).json({ workflows });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    res.status(500).json({ message: 'Failed to fetch workflows' });
  }
};

// Get a specific workflow by ID
const getById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const workflow = await getWorkflowById(id, userId);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ workflow });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    res.status(500).json({ message: 'Failed to fetch workflow' });
  }
};

// Update a workflow
const update = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updates = req.body;

  try {
    if (!updates) {
      return res.status(400).json({ message: 'No updates provided' });
    }
    const updatedWorkflow = await updateWorkflow(id, userId, updates);
    if (!updatedWorkflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ workflow: updatedWorkflow });
  } catch (error) {
    console.error('Error updating workflow:', error);
    res.status(500).json({ message: 'Failed to update workflow' });
  }
};

// Delete a workflow
const remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedWorkflow = await deleteWorkflow(id, userId);
    if (!deletedWorkflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res
      .status(200)
      .json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    console.error('Error deleting workflow:', error);
    res.status(500).json({ message: 'Failed to delete workflow' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
