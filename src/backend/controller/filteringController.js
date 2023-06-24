const filteringModel = require('../model/filteringModel');

const filtering = {
  // Controller method for handling a specific route
  getFiltering: (req, res, pool) => {
    filteringModel.getFiltering(req, res, pool)
      .then(data => {
        // console.log(data);
        console.log('controller - filtering done!')
      })
      .catch(error => {
        console.error(error);
      });
  }
}

module.exports = filtering;