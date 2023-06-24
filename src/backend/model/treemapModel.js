exports.getAllCountByColumn = (async (databaseColumn, pool) => {
    const client = await pool.connect();

    const result = await client.query(
        `SELECT ${databaseColumn} AS key, COUNT(*) AS value 
            FROM terrorism_data 
            GROUP BY ${databaseColumn} 
            ORDER BY COUNT(*) DESC 
            LIMIT 100`);
    const data = result.rows.map(row => ({
        key: row.key.toString(),
        value: row.value.toString()
    }));

    client.release();

    return data;
});