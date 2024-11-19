const request = require('supertest');
const http = require('http');
const app = require('../server'); // Adjust the path to your server file
const pool = require('../src/config/db'); // Import database pool

let server;

// Extend Jest timeout to 30 seconds for longer operations
jest.setTimeout(30000);

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => {
    server.listen(5001, () => {
      console.log('Test server running on port 5001');
      resolve();
    });
  });

  try {
    // Begin transaction for setup
    await pool.query('BEGIN');

    await pool.query('DELETE FROM users WHERE email = $1', [
      'test@example.com',
    ]);
    await pool.query(`
        INSERT INTO users (name, email, password_hash)
        VALUES ('Test User', 'test@example.com', 'hashedpassword123');
    `);

    // Commit transaction
    await pool.query('COMMIT');
    console.log('Database seeded.');
  } catch (error) {
    // Rollback transaction if any error occurs
    await pool.query('ROLLBACK');
    console.error('Error seeding database:', error);
  }
});

afterAll(async () => {
  try {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error('Error closing server:', err);
          reject(err);
        } else {
          console.log('Test server closed');
          resolve();
        }
      });
    });

    await pool.end();
    console.log('Database connections closed');
  } catch (error) {
    console.error('Error in afterAll:', error);
  }
});

describe('API Endpoints', () => {
  // User Endpoints
  it('should register a new user', async () => {
    console.log('Test started: Register a new user');
    const res = await request(server)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'newuser@example.com',
        password: 'password123',
      });
    console.log(
      'Response received for Register a new user:',
      res.body
    );
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      'message',
      'User registered successfully'
    );
  });

  it('should log in a user', async () => {
    console.log('Test started: Log in a user');
    const res = await request(server).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    console.log('Response received for Log in a user:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Workflow Endpoints
  it('should create a new workflow', async () => {
    console.log('Test started: Create a new workflow');
    const res = await request(server)
      .post('/api/workflows')
      .send({
        name: 'Test Workflow',
        triggers: { event: 'testEvent' },
        actions: { action: 'testAction' },
      });
    console.log(
      'Response received for Create a new workflow:',
      res.body
    );
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('workflow');
  });

  it('should retrieve all workflows', async () => {
    console.log('Test started: Retrieve all workflows');
    const res = await request(server).get('/api/workflows');
    console.log(
      'Response received for Retrieve all workflows:',
      res.body
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Funnel Endpoints
  it('should create a new funnel', async () => {
    console.log('Test started: Create a new funnel');
    const res = await request(server)
      .post('/api/funnels')
      .send({
        name: 'Test Funnel',
        steps: { step1: 'Landing Page' },
        analytics: { visits: 100 },
      });
    console.log(
      'Response received for Create a new funnel:',
      res.body
    );
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('funnel');
  });

  it('should retrieve all funnels', async () => {
    console.log('Test started: Retrieve all funnels');
    const res = await request(server).get('/api/funnels');
    console.log(
      'Response received for Retrieve all funnels:',
      res.body
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
