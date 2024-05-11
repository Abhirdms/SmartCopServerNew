// const csv = require('csv-parser'); // Import the 'csv-parser' library for CSV file processing
// const fs = require('fs'); // File system module for reading files
// const Harass = require('../model/harass'); // Your Mongoose model for MongoDB

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
//           const result = await Harass.create(results);
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

// const fs = require('fs');
// const xlsx = require('xlsx');
// const Harass = require('../model/harass');

// module.exports = {
//   processUpload: async (file) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (!file.originalname.endsWith('.xlsx')) {
//           // Unsupported file type
//           reject(new Error('Unsupported file type'));
//           return;
//         }

//         const buffer = fs.readFileSync(file.path);
//         const workbook = xlsx.read(buffer, { type: 'buffer' });

//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const results = xlsx.utils.sheet_to_json(sheet);

//         // Define expected columns and their sequence
//         const expectedColumns = [
//           "Crimeno",
//           "Policestation",
//           "Occurancedate",
//           "Occurancetime",
//           "Registerdate",
//          "Description",
//           "Lat",
//           "Long",
//         ];

//         // Extract actual columns from the sheet and trim spaces
//         const actualColumns = Object.keys(results[0]).map(column => column.toLowerCase().trim());

//         // Check if all expected columns are present (case-insensitive)
//         const missingColumns = expectedColumns.filter(column => !actualColumns.includes(column.toLowerCase()));

//         if (missingColumns.length > 0) {
//           const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
//           console.error(errorMessage);
//           reject(new Error(errorMessage));
//           return;
//         }

//         // Transform data to match expected columns and their sequence
//         const transformedResults = results.map(data => {
//           const transformedData = {};
//           expectedColumns.forEach(column => {
//             // Arrange columns in the expected order and case (ignoring case)
//             const columnIndex = actualColumns.indexOf(column.toLowerCase());
//             transformedData[column] = data[Object.keys(data)[columnIndex]];
//           });
//           return transformedData;
//         });

//         // Save data to the database (assumes Mongoose schema is defined)
//         const result = await Harass.create(transformedResults);
//         console.log('File uploaded and data saved successfully');
//         console.log('Result:', result);

//         resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   },
// };


const fs = require('fs');
const xlsx = require('xlsx');
const Harass = require('../model/harass'); // Keeping the original model name

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

        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON array

        // Define expected columns and their sequence
        const expectedColumns = [
          "Crimeno",
          "Policestation",
          "Occurancedate",
          "Occurancetime",
          "Registerdate",
          "Description",
          "Lat",
          "Long",
        ];

        const expectedColumnsLowercase = expectedColumns.map(column => column.toLowerCase());

        // Find the header row
        let headerRowIndex = -1;
        console.log(rows.length);
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].map(cell => typeof cell === 'string' ? cell.trim().toLowerCase() : cell);
          const foundColumns = row.filter(cell => expectedColumnsLowercase.includes(cell));
          if (foundColumns.length >= 5) {
            headerRowIndex = i;
            break;
          }
        }

        if (headerRowIndex === -1) {
          // Expected columns not found in the header row
          reject(new Error('Expected columns not found in the header row'));
          return;
        }

        // Check if all expected columns are present in the header row
        const headerRow = rows[headerRowIndex].map(cell => cell.trim().toLowerCase()); // Convert header cells to lowercase
        const missingColumns = expectedColumns.filter(column => !headerRow.includes(column.toLowerCase())); // Convert expected column names to lowercase for comparison

        if (missingColumns.length > 0) {
          // Some expected columns are missing in the header row
          const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }
       function excelSerialNumberToDate(serial) {
         if (serial === '') {
           return ''; // Return empty string for empty cell values
           }
          const utcDays = Math.floor(serial - 25569);
          const utcValue = utcDays * 86400;
          const dateInfo = new Date(utcValue * 1000);
      
          const day = String(dateInfo.getDate()).padStart(2, '0');
          const month = String(dateInfo.getMonth() + 1).padStart(2, '0');
          const year = dateInfo.getFullYear();
      
          return `${day}-${month}-${year}`;
      }

      function parseTimeToExcelSerialNumber(serialNumber) {
        if (serialNumber === '') {
           return ''; // Return empty string for empty cell values
           }
        // Split the time string into hours and minutes
        const hours = Math.floor(serialNumber * 24);
        const minutes = Math.round((serialNumber * 24 * 60) % 60);
      
        // Format the hours and minutes into a time string
        const formattedHours = String(hours).padStart(2, '0'); // Ensure two digits for hours
        const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two digits for minutes
      
        // Return the time string in HH:MM format
        return `${formattedHours}:${formattedMinutes}`;
      }
      

        // Extract data from rows starting from the row after the header
        for (let i = headerRowIndex + 1; i < rows.length; i++) {
          const rowData = {};
          const row = rows[i];
          const isEmptyRow = row.every(cell => cell === '');
          if (isEmptyRow) {
            continue;
          }

          // Iterate over each column in the row
          for (let j = 0; j < expectedColumns.length; j++) {
            const columnName = expectedColumns[j];
            let cellValue = row[j] || '';
            if (columnName === 'Occurancetime') {
              // Parse the time string and convert it into an Excel serial number
              cellValue = parseTimeToExcelSerialNumber(cellValue);
            } else if (columnName === 'Occurancedate' || columnName === 'Registerdate') {
              cellValue = excelSerialNumberToDate(cellValue);
          }
            console.log("This is the cell:", cellValue); // Use empty string if cell value is empty
            rowData[columnName] = cellValue;
          }
          console.log(rowData);

          // Save the rowData to Dacoity collection
          const result = await Harass.create(rowData);
          console.log('Data saved successfully:', result);
        }

        console.log('File uploaded and data saved successfully');

        resolve({ message: 'File uploaded and data saved successfully' });
      } catch (error) {
        reject(error);
      }
    });
  },
};

