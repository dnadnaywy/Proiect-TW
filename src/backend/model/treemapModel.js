exports.getAllCountByColumn = (async (databaseColumn, pool) => {
    const client = await pool.connect();

    let data = null;
    if (databaseColumn === 'nkill' || databaseColumn === 'nkill_us') {
        const result = await client.query(
            `SELECT ${databaseColumn}, COUNT(*) 
                FROM terrorism_data 
                WHERE ${databaseColumn} NOT LIKE '%Unknown%'
                GROUP BY ${databaseColumn} 
                ORDER BY ${databaseColumn} DESC
                LIMIT 100`
        );
        data = result.rows.map(row => ({
            key: row.count.toString(),
            value: row[databaseColumn]
        }));
    } else {
        const result = await client.query(
            `SELECT ${databaseColumn}, COUNT(*) 
                FROM terrorism_data
                WHERE ${databaseColumn} NOT LIKE '%Unknown%'
                GROUP BY ${databaseColumn} 
                ORDER BY COUNT(*) DESC
                LIMIT 100`
        );
        data = result.rows.map(row => ({
            key: row[databaseColumn],
            value: row.count.toString()
        }));
    }

    client.release();

    return data;
});