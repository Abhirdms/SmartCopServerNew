const csv = require('csv-parser');
const fs = require('fs');
const Towerpage = require('../model/towerpage');

module.exports = {
  processUpload: async (file) => {
    try {
      const results = [];
      // Process the CSV file
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => {
          // Convert Lat and Lon to numbers
          const latitude = parseFloat(data.Lat);
          const longitude = parseFloat(data.Lon);

          // Push data into the results array in the desired GeoJSON format
          results.push({
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            address: data.Address,
          });
        }).on('end', async () => {
          // Save data to the database
          const result = await Towerpage.create(results);
          resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
        })
        .on('error', (error) => {
          reject(error);
        });
      //   .on('end', async () => {
      //     // Save data to the database
      //     const result = await Parking.create(results);
      //     resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
      //   });

      // return new Promise((resolve, reject) => {
      //   // Handle any errors during CSV processing
      //   process.on('unhandledRejection', (reason, promise) => {
      //     reject(reason);
      //   });
      // });
    } catch (error) {
      throw error;
    }
  },
};
