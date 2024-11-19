const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const workflowRoutes = require('./src/routes/workflowRoutes');
const funnelRoutes = require('./src/routes/funnelRoutes'); // Import Funnels Routes

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/funnels', funnelRoutes); // Mount Funnels Routes

// Export app for testing, only start server in non-test environments
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}
