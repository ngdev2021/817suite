const pool = require('./src/config/db'); // Ensure your DB connection is in `config/db.js`

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to DB at:', res.rows[0].now);
  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    pool.end(); // Ensure the connection pool is closed after testing
  }
})();
