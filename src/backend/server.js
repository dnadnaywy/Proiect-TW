const { Pool } = require('pg');
const http = require('http');

const pool = new Pool({
  user: 'postgres',
  host: 'bdd-solutions.ci7zeff9myeo.eu-central-1.rds.amazonaws.com',
  database: 'bddsolutions',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
});

const server = http.createServer(async (req, res) => {
  if (req.url === '/terrorism-data' && req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM terrorism_data');
      const users = result.rows;
      client.release();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (error) {
      console.error('Error executing query', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
    finally {
      pool.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const port = 3000; // Choose the port number you want to use
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//-------------------------------------------------------------------------------------------

function insertRowIntoTest(name) {
  const insertQuery = `
  INSERT INTO test (name)
  VALUES ($1)
  `;

  const values = [name];

  pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully');
    }

    // Close the database connection
  });
}

function insertRowIntoTerrorismTable(summary, country, region, attack_type, target, group_name, weapon_type, weapon_subtype, nkill, nkillus) {
  const insertQuery = `
  INSERT INTO terrorism_data (summary, country, region, attack_type, target, group_name, weapon_type, weapon_subtype, nkill, nkill_us)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  const values = [summary, country, region, attack_type, target, group_name, weapon_type, weapon_subtype, nkill, nkillus];

  pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully');
    }

    // Close the database connection
  });
}

module.exports = {
  insertRowIntoTerrorismTable: insertRowIntoTerrorismTable
};