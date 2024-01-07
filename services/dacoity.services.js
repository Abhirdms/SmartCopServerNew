const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
const fs = require('fs'); // File system module for reading files
const Dacoity = require('../model/dacoity'); // Your Mongoose model for MongoDB

module.exports = {
  processUpload: async (file) => {
    try {
      const results = [];
      // Process the CSV file
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => {
          // Process each row of CSV data and push it into the results array
          results.push(data);
        })
        .on('end', async () => {
          // Save data to the database (assumes Mongoose schema is defined)
          const result = await Dacoity.create(results);
          return { message: 'File uploaded and data saved successfully', data: result };
        });

      return new Promise((resolve, reject) => {
        // Handle any errors during CSV processing
        process.on('unhandledRejection', (reason, promise) => {
          reject(reason);
        });
      });
    } catch (error) {
      throw error;
    }
  },
};
