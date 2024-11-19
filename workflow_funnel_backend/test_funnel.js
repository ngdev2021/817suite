const {
  createFunnel,
  getFunnelsByUser,
  getFunnelById,
  updateFunnel,
  deleteFunnel,
} = require('./src/models/Funnel');

(async () => {
  try {
    const userId = 1; // Replace with an existing user ID in your database

    // Create a funnel
    const newFunnel = await createFunnel(
      userId,
      'Sample Funnel',
      { step1: 'Landing Page', step2: 'Checkout' },
      { visits: 100, conversions: 10 }
    );
    console.log('Funnel Created:', newFunnel);

    // Get all funnels for the user
    const funnels = await getFunnelsByUser(userId);
    console.log('All Funnels:', funnels);

    // Get a specific funnel by ID
    const funnel = await getFunnelById(newFunnel.id, userId);
    console.log('Funnel by ID:', funnel);

    // Update the funnel
    const updatedFunnel = await updateFunnel(newFunnel.id, userId, {
      name: 'Updated Funnel',
      analytics: { visits: 150, conversions: 20 },
    });
    console.log('Updated Funnel:', updatedFunnel);

    // Delete the funnel
    const deletedFunnel = await deleteFunnel(newFunnel.id, userId);
    console.log('Deleted Funnel ID:', deletedFunnel);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(); // Exit the process after testing
  }
})();
