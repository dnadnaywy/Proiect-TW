const { Pool } = require('pg');
const http = require('http');
const pieChartController = require('./controller/pieChartController');
const treemapController = require('./controller/treemapController');

const pool = new Pool({
  user: 'postgres',
  host: 'bdd-solutions.ci7zeff9myeo.eu-central-1.rds.amazonaws.com',
  database: 'bddsolutions',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
  max: 20, // Maximum number of connections in the pool
});

module.exports = pool;

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
  }
  // ----------------------------- PIE CHART ----------------------------------------------
  else if (req.url === '/api/countAttackTypes' && req.method === 'GET') {
    pieChartController.getCountAttackTypes(req, res, pool);
  } else if (req.url === '/api/pie/country' && req.method === 'GET') {
    const country = 'country';
    pieChartController.getCountCountry(req, res, pool, country);
  } else if (req.url === '/api/pie/region' && req.method === 'GET') {
    const region = 'region';
    pieChartController.getCountCountry(req, res, pool, region);
  } else if (req.url === '/api/pie/target' && req.method === 'GET') {
    const target = 'target';
    pieChartController.getCountCountry(req, res, pool, target);
  } else if (req.url === '/api/pie/group_name' && req.method === 'GET') {
    const group_name = 'group_name';
    pieChartController.getCountCountry(req, res, pool, group_name);
  } else if (req.url === '/api/pie/weapon_type' && req.method === 'GET') {
    const weapon_type = 'weapon_type';
    pieChartController.getCountCountry(req, res, pool, weapon_type);
  } else if (req.url === '/api/pie/weapon_subtype' && req.method === 'GET') {
    const weapon_subtype = 'weapon_subtype';
    pieChartController.getCountCountry(req, res, pool, weapon_subtype);
  } else if (req.url === '/api/pie/nkill' && req.method === 'GET') {
    const nkill = 'nkill';
    pieChartController.getCountCountry(req, res, pool, nkill);
  } else if (req.url === '/api/pie/nkill_us' && req.method === 'GET') {
    const nkill_us = 'nkill_us';
    pieChartController.getCountCountry(req, res, pool, nkill_us);
  } 
  // ----------------------------- SEARCH PAGE --------------------------------------------
  else if (req.url === '/api/terrorist-cards' && req.method === 'GET') {
    pieChartController.getAllRow(req, res, pool);
  } else if (req.url.startsWith('/api/terrorist-card/') && req.method === 'GET') {
    const id = req.url.substring(20);
    pieChartController.getAllRowById(req, res, pool, id);
  } 
  // ------------------------------ TREEMAP -----------------------------------------------
  else if (req.url === '/api/treemap/country' && req.method === 'GET') {
    const country = 'country';
    treemapController.getCountByColumn(req, res, pool, country);
  } else if (req.url === '/api/treemap/region' && req.method === 'GET') {
    const region = 'region';
    treemapController.getCountByColumn(req, res, pool, region);
  } else if (req.url === '/api/treemap/attack_type' && req.method === 'GET') {
    const attack_type = 'attack_type';
    treemapController.getCountByColumn(req, res, pool, attack_type);
  } else if (req.url === '/api/treemap/target' && req.method === 'GET') {
    const target = 'target';
    treemapController.getCountByColumn(req, res, pool, target);
  } else if (req.url === '/api/treemap/group_name' && req.method === 'GET') {
    const group = 'group_name';
    treemapController.getCountByColumn(req, res, pool, group);
  } else if (req.url === '/api/treemap/weapon_type' && req.method === 'GET') {
    const weapon = 'weapon_type';
    treemapController.getCountByColumn(req, res, pool, weapon);
  } else if (req.url === '/api/treemap/weapon_subtype' && req.method === 'GET') {
    const weapon_subtype = 'weapon_subtype';
    treemapController.getCountByColumn(req, res, pool, weapon_subtype);
  } else if (req.url === '/api/treemap/nkill' && req.method === 'GET') {
    const deaths = 'nkill';
    treemapController.getCountByColumn(req, res, pool, deaths);
  } else if (req.url === '/api/treemap/nkill_us' && req.method === 'GET') {
    const deaths_us = 'nkill_us';
    treemapController.getCountByColumn(req, res, pool, deaths_us);
  }
  // ---------------------------- LINE CHART ----------------------------------------------

  // ----------------------------- WORLD MAP ----------------------------------------------
  
  // -------------------------- 404 NOT FOUND ---------------------------------------------
  else {
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