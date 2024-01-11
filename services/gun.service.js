// const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
// const fs = require('fs'); // File system module for reading files
// const Gun = require('../model/gun'); // Your Mongoose model for MongoDB

// module.exports = {
//   processUpload: async (file) => {
    
//     try {
//       const results = [];
//       const expectedColumns = [
//         "Licenseno",
//   "Issuedby",  // Assuming it's a Unix timestamp
//   "Dob",
//   "Armtype",
//   "Dateofissue",
//   "Dateofexpiry",
//       ];

//       let actualColumns;
//       // Process the CSV file
//       fs.createReadStream(file.path)
//         .pipe(csv())
//         .on('data', (data) => {
//           if (!actualColumns) {
//             // If actualColumns is not set, it means this is the first row
//             actualColumns = Object.keys(data).map(column => column.toLowerCase());
//           }

//           const missingColumns = expectedColumns
//             .filter((column) => !actualColumns.includes(column.toLowerCase()));

//             if (missingColumns.length > 0) {
//               // Handle missing columns (e.g., log an error, return an error response)
//               // console.error(`Missing columns: ${missingColumns.join(', ')}`);
//               // console.log(missingColumns);
//               // reject(new Error(`Missing columns: ${missingColumns.join(', ')}`));
//               const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
//               console.error(errorMessage);
//               reject(new Error(errorMessage));
//               return;
//               return;
//             }

//             const transformedData = {};
//             expectedColumns.forEach((column) => {
//               // Arrange columns in the expected order and case (ignoring case)
//               const columnIndex = actualColumns.indexOf(column.toLowerCase());
//               transformedData[column] = data[Object.keys(data)[columnIndex]];
//             });

//           // Process each row of CSV data and push it into the results array
//           results.push(transformedData);
//         })
//         .on('end', async () => {
//           if (results.length === 0) {
//             // Handle the case when no valid data is found
//             console.error('No valid data found in the CSV file');
//             reject(new Error('No valid data found in the CSV file'));
//             return;
//           }
//           // Save data to the database (assumes Mongoose schema is defined)
//           const result = await Gun.create(results);
//           console.log('File uploaded and data saved successfully');
//             console.log('Result:', result);

//             resolve({ message: 'File uploaded and data saved successfully', data: result });
//         });

//       return new Promise((resolve, reject) => {
//         // Handle any errors during CSV processing
//         process.on('unhandledRejection', (reason, promise) => {
//           reject(reason);
//         });
//       });
//     } catch (error) {
//       reject(error);
//       throw error;
//     }
//   },
// };

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
              actualColumns = Object.keys(data).map(column => column.toLowerCase().trim());
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

