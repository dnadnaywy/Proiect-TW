// Import any required modules or dependencies
const pieChartModel = require('../model/pieChartModel');

const allCountAttackTypes = {
  // Controller method for handling a specific route
  getCountAttackTypes: (req, res, pool) => {
    // Retrieve data from the model or perform any necessary operations
    pieChartModel.getAllCountAttackTypes(pool)
      .then(data => {
        // Respond with the data or perform additional processing
        // console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      })
      .catch(error => {
        // Handle any errors that occur during processing
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      });
  },

  getCountCountry: (req, res, pool, databaseColumn) => {
    // Retrieve data from the model or perform any necessary operations
    pieChartModel.getAllCountCountry(databaseColumn, pool)
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

  // // Controller method for handling another route
  // postExample: (req, res) => {
  //   // Extract data from the request body or parameters
  //   const { name, age } = req.body;

  //   // Perform data validation or any other required operations

  //   // Save the data to the model or perform any necessary operations
  //   ExampleModel.saveData({ name, age })
  //     .then(() => {
  //       // Respond with a success message or perform additional processing
  //       res.status(200).json({ message: 'Data saved successfully' });
  //     })
  //     .catch(error => {
  //       // Handle any errors that occur during processing
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     });
  // }
};

module.exports = allCountAttackTypes;