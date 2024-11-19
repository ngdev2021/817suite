const express = require('express');
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/workflowController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Secure all routes with the authMiddleware
router.use(authMiddleware);

// Workflow routes
router.post('/', create); // Create a new workflow
router.get('/', getAll); // Get all workflows for the user
router.get('/:id', getById); // Get a specific workflow
router.put('/:id', update); // Update a workflow
router.delete('/:id', remove); // Delete a workflow

module.exports = router;
