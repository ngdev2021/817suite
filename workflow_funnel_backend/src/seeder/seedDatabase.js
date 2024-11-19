const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const seedDatabase = async () => {
  try {
    // Reset the database (drop and recreate the users table)
    await pool.query(`
      DROP TABLE IF EXISTS users;
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database schema reset.');

    const users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
      {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      },
      {
        name: 'Reggie',
        email: 'testuser@testuser.com',
        password: 'password123',
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [user.name, user.email, hashedPassword]
      );
    }

    console.log('Database seeded with test users.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
};

seedDatabase();
