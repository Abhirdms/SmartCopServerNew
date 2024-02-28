// const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
// const fs = require('fs'); // File system module for reading files
// const Theft = require('../model/theft'); // Your Mongoose model for MongoDB

// module.exports = {
//   processUpload: async (file) => {
//     return new Promise(async (resolve, reject) => {
//     try {
//       const results = [];

//       const expectedColumns = [


//         "Crimeno",
//  "Policestation",  // Assuming it's a Unix timestamp
//   "Occurancedate",
//   "Occurancetime",
//   "Registerdate",
//   "Lat",
//   "Long",
 
//       ];
//       let actualColumns;
//       // Process the CSV file
//       fs.createReadStream(file.path)
//         .pipe(csv())
//         .on('data', (data) => {

//           if (!actualColumns) {
//             actualColumns = Object.keys(data).map(column => column.toLowerCase().trim());
//           }

//           const missingColumns = expectedColumns
//             .filter((column) => !actualColumns.includes(column.toLowerCase()));

//           if (missingColumns.length > 0) {
//             const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
//             console.error(errorMessage);
//             reject(new Error(errorMessage));
//             return;
//           }
//           const transformedData = {};
//           expectedColumns.forEach((column) => {
//             const columnIndex = actualColumns.indexOf(column.toLowerCase());
//             transformedData[column] = data[Object.keys(data)[columnIndex]];
//           });
//           // Process each row of CSV data and push it into the results array
//           results.push(transformedData);
//         })
//         .on('end', async () => {
//           if (results.length === 0) {
//             console.error('No valid data found in the CSV file');
//   reject({ success: false, error: new Error('No valid data found in the CSV file') });
//   return;
//           }
//           // Save data to the database (assumes Mongoose schema is defined)
//           const result = await Theft.create(results);
//           resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
//         }).on('error', (error) => {
//           console.error('Error during CSV processing:', error);
//           reject(error);
//         });
//     } catch (error) {
//       throw error;
//     }
//   });
//   },
// };
const fs = require('fs');
const xlsx = require('xlsx');
const Theft = require('../model/theft');

module.exports = {
  processUpload: async (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!file.originalname.endsWith('.xlsx')) {
          // Unsupported file type
          reject(new Error('Unsupported file type'));
          return;
        }

        const buffer = fs.readFileSync(file.path);
        const workbook = xlsx.read(buffer, { type: 'buffer' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const results = xlsx.utils.sheet_to_json(sheet);

        // Define expected columns and their sequence
        const expectedColumns = [
          "Crimeno",
          "Policestation",
          "Occurancedate",
          "Occurancetime",
          "Registerdate",
          "Lat",
          "Long",
        ];

        // Extract actual columns from the sheet and trim spaces
        const actualColumns = Object.keys(results[0]).map(column => column.toLowerCase().trim());

        // Check if all expected columns are present (case-insensitive)
        const missingColumns = expectedColumns.filter(column => !actualColumns.includes(column.toLowerCase()));

        if (missingColumns.length > 0) {
          const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }

        // Transform data to match expected columns and their sequence
        const transformedResults = results.map(data => {
          const transformedData = {};
          expectedColumns.forEach(column => {
            // Arrange columns in the expected order and case (ignoring case)
            const columnIndex = actualColumns.indexOf(column.toLowerCase());
            transformedData[column] = data[Object.keys(data)[columnIndex]];
          });
          return transformedData;
        });

        // Save data to the database (assumes Mongoose schema is defined)
        const result = await Theft.create(transformedResults);
        console.log('File uploaded and data saved successfully');
        console.log('Result:', result);

        resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
      } catch (error) {
        reject(error);
      }
    });
  },
};
