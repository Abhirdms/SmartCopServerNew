const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
const fs = require('fs'); // File system module for reading files
const Dacoity = require('../model/dacoity'); // Your Mongoose model for MongoDB

module.exports = {
  processUpload: async (file) => {
    return new Promise(async (resolve, reject) => {
    try {
      const results = [];
      const expectedColumns = [


        "Crimeno",
 "Policestation",  // Assuming it's a Unix timestamp
  "Occurancedate",
  "Occurancetime",
  "Registerdate",
  "Lat",
  "Lat",
 
      ];
      let actualColumns;
      // Process the CSV file
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => {

          if (!actualColumns) {
            actualColumns = Object.keys(data).map(column => column.toLowerCase());
          }

          const missingColumns = expectedColumns
            .filter((column) => !actualColumns.includes(column.toLowerCase()));

          if (missingColumns.length > 0) {
            const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
            console.error(errorMessage);
            reject(new Error(errorMessage));
            return;
          }
          const transformedData = {};
          expectedColumns.forEach((column) => {
            const columnIndex = actualColumns.indexOf(column.toLowerCase());
            transformedData[column] = data[Object.keys(data)[columnIndex]];
          });




          // Process each row of CSV data and push it into the results array
          results.push(transformedData);
        })
        .on('end', async () => {
          // Save data to the database (assumes Mongoose schema is defined)
          const result = await Dacoity.create(results);
          resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
        }).on('error', (error) => {
          console.error('Error during CSV processing:', error);
          reject(error);
        });
    } catch (error) {
      throw error;
    }
  });
  },
};
