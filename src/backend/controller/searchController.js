const searchModel = require('../model/searchModel');

const allCountries = {
  getAllCountries: (req, res, pool) => {
    searchModel.getCountries(pool)
      .then(data => {
        // console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      });
  }
}

module.exports = allCountries;