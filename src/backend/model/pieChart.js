// const pool = require('../server'); // Import the connection pool

exports.getAllCountAttackTypes = (async (pool) => {
  const client = await pool.connect();
  const result = await client.query('SELECT attack_type, COUNT(*) FROM terrorism_data GROUP BY attack_type');
  const attackTypes = result.rows;
  client.release();
  return attackTypes;
});