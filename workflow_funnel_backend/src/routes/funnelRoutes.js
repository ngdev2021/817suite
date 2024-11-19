const express = require('express');
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/funnelController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Secure all routes with the authMiddleware
router.use(authMiddleware);

// Funnels routes
router.post('/', create); // Create a new funnel
router.get('/', getAll); // Get all funnels for the user
router.get('/:id', getById); // Get a specific funnel
router.put('/:id', update); // Update a funnel
router.delete('/:id', remove); // Delete a funnel

module.exports = router;
