exports.getAllCountriesAttacks = (async (pool) => {
    const client = await pool.connect();

    let data = null;

    const result = await client.query(
        `SELECT country, COUNT(*) 
            FROM terrorism_data
            GROUP BY country
            ORDER BY COUNT(*) DESC`
    );
    data = result.rows;

    client.release();

    return data;
});