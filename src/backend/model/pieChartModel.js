exports.getAllCountCountry = (async (databaseColumn, pool) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT ${databaseColumn} AS key, COUNT(*) AS value FROM terrorism_data GROUP BY ${databaseColumn} ORDER BY COUNT(*) DESC limit 10`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});

exports.getAllRowFromDatabase = (async (pool) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT * FROM terrorism_data ORDER BY summary DESC limit 10`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});

exports.getAllRowFromDatabaseById = (async (id, pool) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT * FROM terrorism_data WHERE id = ${id} ORDER BY summary DESC limit 10`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});