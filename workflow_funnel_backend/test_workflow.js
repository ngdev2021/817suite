const axios = require('axios');
const http = require('http');
const app = require('./server'); // Import the Express app

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

    console.log('--- Running Workflow Tests ---');

    // Test 1: Create a new workflow
    try {
      const createResponse = await axios.post(
        `${baseURL}/workflows`,
        {
          name: 'Test Workflow',
          triggers: { event: 'testEvent' },
          actions: { action: 'testAction' },
        }
      );
      console.log('Test 1: Create a new workflow');
      console.log('Response:', createResponse.data);
      if (
        createResponse.status === 201 &&
        createResponse.data.workflow
      ) {
        console.log('✔ Workflow created successfully');
      } else {
        console.error('✘ Failed to create workflow');
      }
    } catch (error) {
      console.error(
        '✘ Error in creating workflow:',
        error.response?.data || error.message
      );
    }

    // Test 2: Retrieve all workflows
    try {
      const getResponse = await axios.get(`${baseURL}/workflows`);
      console.log('\nTest 2: Retrieve all workflows');
      console.log('Response:', getResponse.data);
      if (
        getResponse.status === 200 &&
        Array.isArray(getResponse.data)
      ) {
        console.log('✔ Workflows retrieved successfully');
      } else {
        console.error('✘ Failed to retrieve workflows');
      }
    } catch (error) {
      console.error(
        '✘ Error in retrieving workflows:',
        error.response?.data || error.message
      );
    }
  } catch (err) {
    console.error('✘ Error in running tests:', err.message);
  } finally {
    // Shut down the test server
    if (server) {
      server.close(() => {
        console.log('\nTest server closed');
      });
    }
  }
}

// Run the tests
runTests();
