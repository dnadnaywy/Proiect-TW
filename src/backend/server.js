const { Pool } = require('pg');
const http = require('http');

const handleApiRequest = require("./controller/controller");
const handleViewRequest = require("../view.js")
const config = require('./utils/configuration');
const { encryptedPassword } = require('./security/passwordEncrypted');
const path = require('path');
const fs = require('fs');
const databaseInitialization = require("./database/database");

const mimeMap = {
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const pool = new Pool({
  user: 'postgres',
  host: 'bdd-solutions.ci7zeff9myeo.eu-central-1.rds.amazonaws.com',
  database: 'bddsolutions',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
  max: 20, // Maximum number of connections in the pool
});

databaseInitialization(pool).then(result => {
  if (result) {
    console.log('Database initialized successfully');
  }
});

module.exports = pool;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  Mapping(req, res); //
});
//-------------------------------------------------
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//-----------------------------------------------
async function Mapping(req, res) {
    if (req.url.startsWith('/api')) {
    await handleApiRequest(req, res, pool);
  } else if (req.url.startsWith('/view')) {
    handleViewRequest(req, res);
  } else {
    console.log(req.url);
    const fileUrl = req.url;
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