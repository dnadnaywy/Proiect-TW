const paginationModel = require('../model/paginationModel');

const all10RowsPagination = {

  get10RowsPagination: (req, res, pool, page) => {
    paginationModel.get10RowsAtOnce(pool, page)
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

module.exports = all10RowsPagination;