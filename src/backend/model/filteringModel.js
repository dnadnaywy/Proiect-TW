exports.getFiltering = (async (req, res, pool) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { countries, attackTypes } = JSON.parse(body);

    // console.log(countries);
    // console.log(attackTypes);

    // Handle the request parameters and perform database query
    // Example: Run a SELECT query to fetch filtered data
    if (countries.length == 0 && attackTypes.length == 0) {
      const selectQuery = `SELECT * FROM terrorism_data LIMIT 10`;

      pool.query(selectQuery, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end();
        } else {
          // Process the query results as needed
          const filteredData = results.rows;
          // console.log(JSON.stringify(filteredData));
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(filteredData));
        }
      });
    } else if (countries.length == 0) {
      pool.query("SELECT * FROM terrorism_data WHERE attack_type = ANY ($1) LIMIT 10", [ attackTypes ], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end();
        } else {
          // Process the query results as needed
          const filteredData = results.rows;
          // console.log('filtered stuff' + filteredData);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(filteredData));
        }
      });
    } else if (attackTypes.length == 0) {
      // query("SELECT * FROM terrorism_data WHERE country = ANY ($1) LIMIT 10", [ countries ]);
      pool.query("SELECT * FROM terrorism_data WHERE country = ANY ($1) LIMIT 10", [ countries ], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end();
        } else {
          // Process the query results as needed
          const filteredData = results.rows;
          // console.log(filteredData);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(filteredData));
        }
      });
    } else {
      pool.query('SELECT * FROM terrorism_data WHERE country = ANY ($1) AND attack_type = ANY ($2) LIMIT 10', [countries, attackTypes], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end();
        } else {
          // Process the query results as needed
          const filteredData = results.rows;
          // console.log(filteredData);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(filteredData));
        }
      });
    }

  });
});
