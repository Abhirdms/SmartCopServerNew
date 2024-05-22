
// const fs = require('fs');
// const csv = require('csv-parser');
// const Offender = require('../model/Offender');

// class OffenderService {
//   static async addOffender(
//     name,
//     aliasName,
//     crimeHead,
//     crimeSubHead,
//     mo,
//     crimeNumber,
//     fpsNumber,
//     state,
//     district,
//     policeStation,
//     latLon
//   ) {
//     try {
//       console.log('Creating offender data:', {
//         name,
//         aliasName,
//         crimeHead,
//         crimeSubHead,
//         mo,
//         crimeNumber,
//         fpsNumber,
//         state,
//         district,
//         policeStation,
//         latLon,
//       });

//       const createOffenderData = new Offender({
//         name,
//         aliasName,
//         crimeHead,
//         crimeSubHead,
//         mo,
//         crimeNumber,
//         fpsNumber,
//         state,
//         district,
//         policeStation,
//         latLon,
//       });

//       console.log('Offender data before save:', createOffenderData);

//       const savedOffender = await createOffenderData.save();
//       console.log('Offender data after save:', savedOffender);

//       return savedOffender;
//     } catch (err) {
//       console.error('Error in offender service:', err);
//       throw new Error('Failed to create offender');
//     }
//   }

//   static processOffenderUpload(file) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const results = [];
//         const expectedColumns = [
//           "name",
//           "aliasName",
//           "crimeHead",
//           "crimeSubHead",
//           "mo",
//           "crimeNumber",
//           "fpsNumber",
//           "state",
//           "district",
//           "policeStation",
//           "latLon",
//           "highqualityphotographs"
//         ];

//         let actualColumns;

//         if (!file || !file.path) {
//           throw new Error('Invalid file or file path');
//         }

//         console.log('File path before creating read stream:', file.path);
//         console.log('File path:', file.path);

//         fs.createReadStream(file.path)
//           .pipe(csv())
//           .on('data', (data) => {
//             if (!actualColumns) {
//               actualColumns = Object.keys(data).map(column => column.toLowerCase().trim());
//             }

//             // Handle missing columns
//             const missingColumns = expectedColumns
//               .filter((column) => !actualColumns.includes(column.toLowerCase()));

//             if (missingColumns.length > 0) {
//               const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
//               console.error(errorMessage);
//               reject(new Error(errorMessage));
//               return;
//             }

//             // Correct the format and match the case
//             const transformedData = {};
//             expectedColumns.forEach((column) => {
//               const columnIndex = actualColumns.indexOf(column.toLowerCase());
//               transformedData[column] = data[Object.keys(data)[columnIndex]];
//             });

//             // Process each row of CSV data and push it into the results array
//             results.push(transformedData);
//           })
//           .on('end', async () => {
//             const savedData = [];

//             for (const data of results) {
//               const createOffenderData = new Offender(data);
//               console.log('Offender data before save:', createOffenderData);

//               const savedOffender = await createOffenderData.save();
//               console.log('Offender data after save:', savedOffender);

//               savedData.push(savedOffender);
//             }

//             console.log('Data Saved to Database:', savedData);

//             resolve({ message: 'File uploaded and data saved successfully', data: savedData });
//           })
//           .on('error', (error) => {
//             console.error('Error during CSV processing:', error);
//             reject(error);
//           });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// }

// module.exports = OffenderService;

const fs = require('fs');
const xlsx = require('xlsx');
const Offender = require('../model/Offender');
// class OffenderService {
//   static async addOffender(
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       mobileno,
//       address,
//       state,
//       district,
//       policeStation,
//       lat,
//       long,
//       action,
//       highqualityphotographs
//   ) {
//     try {
//       console.log('Creating offender data:', {
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       mobileno,
//       address,
//       state,
//       district,
//       policeStation,
//       lat,
//       long,
//       action,
//       highqualityphotographs
//       });

//       const createOffenderData = new Offender({
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       mobileno,
//       address,
//       state,
//       district,
//       policeStation,
//       lat,
//       long,
//       action,
//       highqualityphotographs
//       });

//       console.log('Offender data before save:', createOffenderData);

//       const savedOffender = await createOffenderData.save();
//       console.log('Offender data after save:', savedOffender);

//       return savedOffender;
//     } catch (err) {
//       console.error('Error in offender service:', err);
//       throw new Error('Failed to create offender');
//     }
//   }

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
        const expectedColumns = [
          "name",
          "aliasName",
          "crimeHead",
          "crimeSubHead",
          "mo",
          "crimeNumber",
          "mobileno",
          "address",
          "state",
          "district",
          "policeStation",
          "lat",
          "long",
          "action"
        ];

        const expectedColumnsLowercase = expectedColumns.map(column => column.toLowerCase());

        // Find the header row
        let headerRowIndex = -1;
        console.log(rows.length);
        for (let i = 0; i < rows.length; i++) {
          // const row = rows[i].map(cell => cell.trim().toLowerCase());
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

        // Extract data from rows starting from the row after the header
        for (let i = headerRowIndex + 1; i < rows.length; i++) {
          const rowData = {};
          const row = rows[i];

          // Iterate over each column in the row
          for (let j = 0; j < expectedColumns.length; j++) {
            const columnName = expectedColumns[j];
            const cellValue = row[j] || '';
            console.log("This is the cell:", cellValue); // Use empty string if cell value is empty
            rowData[columnName] = cellValue;
          }
          console.log(rowData);

          // Save the rowData to Offender collection
          const result = await Offender.create(rowData);
          console.log('Data saved successfully:', result);
          
        }

        console.log('File uploaded and data saved successfully');

        resolve({ message: 'File uploaded and data saved successfully' });
                        }
      else {
        const data = req.body;
          const result = await Offender.create(data);
          resolve({ message: 'Data added successfully', result });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}


