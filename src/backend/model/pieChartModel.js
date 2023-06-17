exports.getAllCountAttackTypes = (async (pool) => {
  const client = await pool.connect();
  const result = await client.query('SELECT attack_type, COUNT(*) FROM terrorism_data GROUP BY attack_type');
  const attackTypes = result.rows;
  client.release();
  return attackTypes;
});

exports.getAllCountCountry = (async (databaseColumn, pool) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT ${databaseColumn}, COUNT(*) FROM terrorism_data GROUP BY ${databaseColumn} ORDER BY COUNT(*) DESC`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});