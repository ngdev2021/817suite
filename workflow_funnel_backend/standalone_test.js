const axios = require('axios');
const http = require('http');
const app = require('./server'); // Import the Express app
const pool = require('./src/config/db'); // Database pool

let server;

async function runTests() {
  try {
    // Start the test server
    server = http.createServer(app);
    server.listen(5001, () => {
      console.log('Test server running on port 5001');
    });

    // Define the base URL for requests
    const baseURL = 'http://localhost:5001/api';

    console.log('--- Running Standalone Tests ---');

    // Clear and seed database
    await pool.query('DELETE FROM users WHERE email = $1', [
      'test@example.com',
    ]);
    await pool.query(`
            INSERT INTO users (name, email, password_hash)
            VALUES ('Test User', 'test@example.com', 'hashedpassword123');
        `);
    console.log('Database seeded.');

    // Test 1: Register a new user
    try {
      const registerResponse = await axios.post(
        `${baseURL}/users/register`,
        {
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
        }
      );
      console.log('Test 1: Register a new user');
      console.log('Response:', registerResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to register user:',
        error.response?.data || error.message
      );
    }

    // Test 2: Log in a user
    try {
      const loginResponse = await axios.post(
        `${baseURL}/users/login`,
        {
          email: 'test@example.com',
          password: 'password123',
        }
      );
      console.log('\nTest 2: Log in a user');
      console.log('Response:', loginResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to log in user:',
        error.response?.data || error.message
      );
    }

    // Test 3: Create a new workflow
    try {
      const workflowResponse = await axios.post(
        `${baseURL}/workflows`,
        {
          name: 'Test Workflow',
          triggers: { event: 'testEvent' },
          actions: { action: 'testAction' },
        }
      );
      console.log('\nTest 3: Create a new workflow');
      console.log('Response:', workflowResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to create workflow:',
        error.response?.data || error.message
      );
    }

    // Test 4: Retrieve all workflows
    try {
      const workflowsResponse = await axios.get(
        `${baseURL}/workflows`
      );
      console.log('\nTest 4: Retrieve all workflows');
      console.log('Response:', workflowsResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to retrieve workflows:',
        error.response?.data || error.message
      );
    }

    // Test 5: Create a new funnel
    try {
      const funnelResponse = await axios.post(`${baseURL}/funnels`, {
        name: 'Test Funnel',
        steps: { step1: 'Landing Page', step2: 'Checkout' },
        analytics: { visits: 100 },
      });
      console.log('\nTest 5: Create a new funnel');
      console.log('Response:', funnelResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to create funnel:',
        error.response?.data || error.message
      );
    }

    // Test 6: Retrieve all funnels
    try {
      const funnelsResponse = await axios.get(`${baseURL}/funnels`);
      console.log('\nTest 6: Retrieve all funnels');
      console.log('Response:', funnelsResponse.data);
    } catch (error) {
      console.error(
        '✘ Failed to retrieve funnels:',
        error.response?.data || error.message
      );
    }
  } catch (err) {
    console.error('✘ Error in running tests:', err.message);
  } finally {
    // Shut down the test server and clean up database
    if (server) {
      server.close(() => {
        console.log('\nTest server closed');
      });
    }

    // await pool.query('DELETE FROM users WHERE email = $1', [
    //   'newuser@example.com',
    // ]);
    // console.log('Database cleaned up.');
    await pool.end();
  }
}

// Run the tests
runTests();
