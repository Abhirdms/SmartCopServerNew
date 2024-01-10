const csv = require('csv-parser');
const fs = require('fs');
const Gun = require('../model/gun');

module.exports = {
  processUpload: (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const results = [];
        const expectedColumns = [
          "Licenseno",
          "Issuedby",
          "Dob",
          "Armtype",
          "Dateofissue",
          "Dateofexpiry",
        ];

        let actualColumns;

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

            results.push(transformedData);
          })
          .on('end', async () => {
            if (results.length === 0) {
              console.error('No valid data found in the CSV file');
    reject({ success: false, error: new Error('No valid data found in the CSV file') });
    return;
            }

            const result = await Gun.create(results);
            console.log('File uploaded and data saved successfully');
  console.log('Result:', result);

  resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
})
          .on('error', (error) => {
            console.error('Error during CSV processing:', error);
            reject(error);
          });

      } catch (error) {
        console.error('Error during CSV processing:', error);
        reject({ success: false, error });
      }
    });
  },
};

