const { Pool } = require('pg');
const http = require('http');
const url = require('url');
const pieChartController = require('./controller/pieChartController');
const paginationController = require('./controller/paginationController');
const searchController = require('./controller/searchController');
const treemapController = require('./controller/treemapController');
const worldmapController = require('./controller/worldmapController');

const handleApiRequest = require("./controller/controller");
const handleViewRequest = require("../view.js")
const config = require('./utils/configuration');
const { encryptedPassword } = require('./security/passwordEncrypted');
const path = require('path');
const fs = require('fs');

const mimeMap = {
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.gif': 'image/gif',
};

const pool = new Pool({
  user: 'postgres',
  host: 'bdd-solutions.ci7zeff9myeo.eu-central-1.rds.amazonaws.com',
  database: 'bddsolutions',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
  max: 20, // Maximum number of connections in the pool
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "users"
    (
        "id"          SERIAL PRIMARY KEY,
        "username"    VARCHAR(255) NOT NULL,
        "firstname"   VARCHAR(255) NOT NULL,
        "lastname"    VARCHAR(255) NOT NULL,
        "email"       VARCHAR(255) NOT NULL,
        "password"    VARCHAR(255) NOT NULL,
        "role"        VARCHAR(255) NOT NULL,
        "birthdate"   DATE         NOT NULL,
        "phonenumber" VARCHAR(255) NOT NULL,
        "created_at"  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "deleted"     BOOLEAN      NOT NULL DEFAULT FALSE
    );`;


const insertAdminAccountQuery = `INSERT INTO users (username, firstname, lastname, email, password, role, birthdate,
                                                    phonenumber)
                                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

const databaseInitialization = async (createTableQuery, insertAdminAccountQuery) => {
  try {
    const client = await pool.connect();

    await client.query(createTableQuery);

    const adminRow = await client.query('SELECT * FROM users WHERE role = $1', [config.adminRole]);
    const values = [config.adminUsername, config.adminFirstname, config.adminLastname, config.adminEmail, await encryptedPassword(config.adminPassword), config.adminRole, config.adminBirthdate, config.adminPhonenumber];

    if (adminRow.rows.length === 0) {
      await client.query(insertAdminAccountQuery, values);
    } else {
      const modifyAdminAccountQuery = `UPDATE users
                                             SET username    = $1,
                                                 firstname   = $2,
                                                 lastname    = $3,
                                                 email       = $4,
                                                 password    = $5,
                                                 role        = $6,
                                                 birthdate   = $7,
                                                 phonenumber = $8
                                             WHERE role = $6`;
      await client.query(modifyAdminAccountQuery, values);
    }

    client.release();
    return true;

  } catch (error) {
    console.error(error.stack);
    return false;
  }

};


databaseInitialization(createTableQuery, insertAdminAccountQuery).then(result => {
  if (result) {
    console.log('Database initialized successfully');
  }
});

module.exports = pool;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  pieChartMapping(req, res); //
});
//-------------------------------------------------
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//-----------------------------------------------
async function pieChartMapping(req, res) {
  const parsedUrl = url.parse(req.url, true); // for the pagination stuff
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
  } else if (req.url === '/api/countAttackTypes' && req.method === 'GET') {
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
  } else if (req.url === '/api/terrorist-cards' && req.method === 'GET') {
    pieChartController.getAllRow(req, res, pool);
  } else if (req.url.startsWith('/api/terrorist-card/') && req.method === 'GET') {
    const id = req.url.substring(20);
    pieChartController.getAllRowById(req, res, pool, id);
  } else if (req.url.startsWith('/api/terrorist-cards') && req.method === 'GET') {
    const queryParams = parsedUrl.query;
    var page = parseInt(queryParams.page) || 1;
    if (page > 18170) {
      page = 1; //any page over 18170 (the last calculated page will be assigned to the first page)
    }
    paginationController.get10RowsPagination(req, res, pool, page);
  } else if (req.url === '/api/countries' && req.method === 'GET') {
    searchController.getAllCountries(req, res, pool);
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
  // ----------------------------- WORLD MAP ----------------------------------------------
  else if (req.url === '/api/worldmap' && req.method === 'GET') {
    worldmapController.getCount(req, res, pool);
  }
  // -------------------------- LOGIN ---------------------------------------------
  else if (req.url.startsWith('/api')) {
    await handleApiRequest(req, res, pool);
  } else if (req.url.startsWith('/view')) {
    handleViewRequest(req, res);
  } else {
    console.log(req.url);
    const fileUrl = '/frontend' + req.url;
    const filePath = path.resolve('..' + fileUrl);
    const fileExt = path.extname(filePath);
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': mimeMap[fileExt] });
        res.end(data);
      }
    });
  }
}
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