// // const xlsx = require('xlsx'); // Import the 'xlsx' library for Excel file processing
// // const MyModel = require('../model/fileupload'); // Your Mongoose model for MongoDB

// // module.exports = {
// //   processUpload: async (file) => {
// //     try {
// //       // Process the Excel file
// //       const workbook = xlsx.readFile(file.path);
// //       const sheetName = workbook.SheetNames[0];
// //       const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// //       // Save data to the database (assumes Mongoose schema is defined)
// //       const result = await MyModel.create(data);

// //       return { message: 'File uploaded and data saved successfully', data: result };
// //     } catch (error) {
// //       throw error;
// //     }
// //   },
// // };



// //working one commented
// // const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
// // const fs = require('fs'); // File system module for reading files
// // const MyModel = require('../model/fileupload'); // Your Mongoose model for MongoDB

// // module.exports = {
// //   processUpload: async (file) => {
// //     try {
// //       const results = [];
      
// //       // Process the CSV file
// //       fs.createReadStream(file.path)
// //         .pipe(csv())
// //         .on('data', (data) => {
// //           // Process each row of CSV data and push it into the results array
// //           results.push(data);
// //         })
// //         .on('end', async () => {
          
// //           // Save data to the database (assumes Mongoose schema is defined)
// //           const result = await MyModel.create(results);
// //           return { message: 'File uploaded and data saved successfully', data: result };
// //         });

// //       return new Promise((resolve, reject) => {
// //         // Handle any errors during CSV processing
// //         process.on('unhandledRejection', (reason, promise) => {
// //           reject(reason);
// //         });
// //       });
// //     } catch (error) {
// //       throw error;
// //     }
// //   },
// // };

// const csv = require('csv-parser');
// const fs = require('fs');
// const MyModel = require('../model/fileupload');

// module.exports = {
//   processUpload: async (file) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const results = [];
//         const expectedColumns = [
//           'Name',
//           'Dob',
//           'Gender',
//           'PrisonerCode',
//           'JailSerialNo',
//           'Crimenosection',
//           'Policestation',
//           'Dateofarrest',
//           'Dateofrelease',
//           'MajorHead',
//           'MinorHead',
//         ];

//         let actualColumns; // To store the actual column names from the CSV file

//         // Process the CSV file
//         fs.createReadStream(file.path)
//           .pipe(csv())
//           .on('data', (data) => {
//             if (!actualColumns) {
//               // If actualColumns is not set, it means this is the first row
//               actualColumns = Object.keys(data).map(column => column.toLowerCase());
//             }

//             const missingColumns = expectedColumns
//               .filter((column) => !actualColumns.includes(column.toLowerCase()));

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

//             // Process each row of CSV data and push it into the results array
//             results.push(transformedData);
//           })
//           .on('end', async () => {
//             if (results.length === 0) {
//               // Handle the case when no valid data is found
//               console.error('No valid data found in the CSV file');
//               reject(new Error('No valid data found in the CSV file'));
//               return;
//             }

//             // Save data to the database (assumes Mongoose schema is defined)
//             const result = await MyModel.create(results);
//             console.log('File uploaded and data saved successfully');
//             console.log('Result:', result);

//             resolve({ message: 'File uploaded and data saved successfully', data: result });
//           });

//       } catch (error) {
//         reject(error);
//       }
//     });
//   },
// };

const fs = require('fs');
const xlsx = require('xlsx');
const MyModel = require('../model/fileupload');

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
          'Name',
          'Dob',
          'Gender',
          'PrisonerCode',
          'JailSerialNo',
          'Crimenosection',
          'Policestation',
          'Dateofarrest',
          'Dateofrelease',
          'MajorHead',
          'MinorHead',
        ];

        // Extract actual columns from the sheet
        // const actualColumns = Object.keys(results[0]);

        // // Check if all expected columns are present
        // const missingColumns = expectedColumns.filter(column => !actualColumns.includes(column));
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
        const result = await MyModel.create(transformedResults);
        console.log('File uploaded and data saved successfully');
        console.log('Result:', result);

        resolve({ message: 'File uploaded and data saved successfully', data: result });
      } catch (error) {
        reject(error);
      }
    });
  },
};
