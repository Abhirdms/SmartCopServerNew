// const csv = require('csv-parser');
// const fs = require('fs');
// const Cctvpage = require('../model/cctvpage');

// module.exports = {
//   processUpload: async (file) => {
//     return new Promise((resolve, reject) => {
//     try {
//       const results = [];
//       // Process the CSV file
//       fs.createReadStream(file.path)
//         .pipe(csv())
//         .on('data', (data) => {
//           // Convert Lat and Lon to numbers
//           const latitude = parseFloat(data.Lat);
//           const longitude = parseFloat(data.Lon);

//           // Push data into the results array in the desired GeoJSON format
//           results.push({
//             location: {
//               type: 'Point',
//               coordinates: [longitude, latitude],
//             },
//             address: data.Address,
//           });
//         }).on('end', async () => {
//             try {
//               const result = await Cctvpage.create(results);
//               resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
//             } catch (error) {
//               reject({ success: false, error });
//             }
//           })
//           .on('error', (error) => {
//             reject({ success: false, error });
//           });
//       //   .on('end', async () => {
//       //     // Save data to the database
//       //     const result = await Parking.create(results);
//       //     resolve({ success: true, message: 'File uploaded and data saved successfully', data: result });
//       //   });

//       // return new Promise((resolve, reject) => {
//       //   // Handle any errors during CSV processing
//       //   process.on('unhandledRejection', (reason, promise) => {
//       //     reject(reason);
//       //   });
//       // });
//     } catch (error) {
//       throw error;
//     }
// });
//   },
// };


//new Excel upload
const fs = require('fs');
const xlsx = require('xlsx');
const Cctvpage = require('../model/cctvpage');

module.exports = {
  processUpload: async (req,file) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (file){
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
        const expectedColumns = ['Lat', 'Long', 'Address','POC'];
        const expectedColumnsLowercase = expectedColumns.map(column => column.toLowerCase());

        // Find the header row
        let headerRowIndex = -1;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].map(cell => typeof cell === 'string' ? cell.trim().toLowerCase() : cell);
          const foundColumns = row.filter(cell =>  expectedColumnsLowercase.includes(cell));
          if (foundColumns.length === expectedColumns.length) {
            headerRowIndex = i;
            break;
          }
        }

        if (headerRowIndex === -1) {
          // Expected columns not found in the header row
          reject(new Error('Expected columns not found in the header row'));
          return;
        }

        const headerRow = rows[headerRowIndex].map(cell => cell.trim().toLowerCase()); // Convert header cells to lowercase
        const missingColumns = expectedColumns.filter(column => !headerRow.includes(column.toLowerCase())); // Convert expected column names to lowercase for comparison

        if (missingColumns.length > 0) {
          // Some expected columns are missing in the header row
          const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }

        // Extract data from rows starting from the row after the header
        const results = [];
        for (let i = headerRowIndex + 1; i < rows.length; i++) {
          const rowData = {};
          const row = rows[i];

          // Iterate over each column in the row
          for (let j = 0; j < expectedColumns.length; j++) {
            const columnName = expectedColumns[j];
            const cellValue = row[j] || '';
            rowData[columnName] = cellValue;
          }

          // Convert Lat and Lon to numbers
          const latitude = parseFloat(rowData['Lat']);
          const longitude = parseFloat(rowData['Long']);

          // Push data into the results array in the desired format
          results.push({
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            Address: rowData['Address'],
            POC: rowData['POC'],
          });
        }

        // Save data to the database
        const result = await Cctvpage.create(results);
        console.log('Data saved successfully:', result);

        console.log('File uploaded and data saved successfully');
        resolve({ message: 'File uploaded and data saved successfully' });
          } else {
        const data = req.body;
          const result = await Cctvpage.create(data);
          resolve({ message: 'Data added successfully', result });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};



