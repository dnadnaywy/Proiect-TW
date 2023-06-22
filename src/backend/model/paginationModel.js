exports.get10RowsAtOnce = (async (pool, page) => {
  const client = await pool.connect();

  const result = await client.query(`SELECT * FROM terrorism_data ORDER BY summary DESC LIMIT 10 OFFSET (${page}-1)*10`);
  const returnedRows = result.rows;
  client.release();
  return returnedRows;
});