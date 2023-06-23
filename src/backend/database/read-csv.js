function populateDatabase() {
  const fs = require('fs');
  const csv = require('csv-parser');

  const filePath = 'C:/Users/panai/TW_LAB/Proiect-TW/src/resources/csv/terrorism-database.csv';

  const databaseFile = require('/database.js');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Process each row of data here
      console.log(`Summary: ${data.summary}, Country: ${data.country_txt}, Region: ${data.region_txt}, Attacktype1_txt: ${data.attacktype1_txt}, Target: ${data.targtype1_txt}, Gname: ${data.gname}, Weaptype1_txt: ${data.weaptype1_txt}, Weapsubtype1_txt: ${data.weapsubtype1_txt}, Nkill: ${data.nkill}, Nkillus: ${data.nkillus}
    `);
      if (data.nkill === '') {
        data.nkill = 0;
      }
      if (data.nkillus === '') {
        data.nkillus = 0;
      }
      databaseFile.insertRowIntoTerrorismTable(data.summary, data.country_txt, data.region_txt, data.attacktype1_txt, data.targtype1_txt, data.gname, data.weaptype1_txt, data.weapsubtype1_txt, data.nkill, data.nkillus);
    })
    .on('end', () => {
      // Actions to perform when reading is finished
      console.log('CSV file successfully processed.');
    });
}

module.exports = {
  populateDatabase: populateDatabase
};