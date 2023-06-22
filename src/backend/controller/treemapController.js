// Import any required modules or dependencies
const treemapModel = require('../model/treemapModel');

const allCountByColumn = {
    getCountByColumn: (req, res, pool, databaseColumn) => {
        // Retrieve data from the model or perform any necessary operations
        treemapModel.getAllCountByColumn(databaseColumn, pool)
            .then(data => {
                // Respond with the data or perform additional processing
                console.log(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch(error => {
                // Handle any errors that occur during processing
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            });
    }
};

module.exports = allCountByColumn;