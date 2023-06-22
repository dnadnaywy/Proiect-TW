exports.getCountries = (async (pool) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT country FROM terrorism_data GROUP BY country ORDER BY country`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});