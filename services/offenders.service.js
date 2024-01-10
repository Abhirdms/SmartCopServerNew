const fs = require('fs');
const csv = require('csv-parser');
const Offender = require('../model/Offender');

class OffenderService {
  static async addOffender(
    name,
    aliasName,
    crimeHead,
    crimeSubHead,
    mo,
    crimeNumber,
    fpsNumber,
    state,
    district,
    policeStation,
    latLon
  ) {
    try {
      console.log('Creating offender data:', {
        name,
        aliasName,
        crimeHead,
        crimeSubHead,
        mo,
        crimeNumber,
        fpsNumber,
        state,
        district,
        policeStation,
        latLon,
      });

      const createOffenderData = new Offender({
        name,
        aliasName,
        crimeHead,
        crimeSubHead,
        mo,
        crimeNumber,
        fpsNumber,
        state,
        district,
        policeStation,
        latLon,
      });

      console.log('Offender data before save:', createOffenderData);

      const savedOffender = await createOffenderData.save();
      console.log('Offender data after save:', savedOffender);

      return savedOffender;
    } catch (err) {
      console.error('Error in offender service:', err);
      throw new Error('Failed to create offender');
    }
  }

  static processOffenderUpload(file) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = [];
        const expectedColumns = [
          "name",
          "aliasName",
          "crimeHead",
          "crimeSubHead",
          "mo",
          "crimeNumber",
          "fpsNumber",
          "state",
          "district",
          "policeStation",
          "latLon",
          "highqualityphotographs"
        ];

        let actualColumns;

        if (!file || !file.path) {
          throw new Error('Invalid file or file path');
        }

        console.log('File path before creating read stream:', file.path);
        console.log('File path:', file.path);

        fs.createReadStream(file.path)
          .pipe(csv())
          .on('data', (data) => {
            if (!actualColumns) {
              actualColumns = Object.keys(data).map(column => column.toLowerCase());
            }

            // Handle missing columns
            const missingColumns = expectedColumns
              .filter((column) => !actualColumns.includes(column.toLowerCase()));

            if (missingColumns.length > 0) {
              const errorMessage = `Missing columns: ${missingColumns.join(', ')}`;
              console.error(errorMessage);
              reject(new Error(errorMessage));
              return;
            }

            // Correct the format and match the case
            const transformedData = {};
            expectedColumns.forEach((column) => {
              const columnIndex = actualColumns.indexOf(column.toLowerCase());
              transformedData[column] = data[Object.keys(data)[columnIndex]];
            });

            // Process each row of CSV data and push it into the results array
            results.push(transformedData);
          })
          .on('end', async () => {
            const savedData = [];

            for (const data of results) {
              const createOffenderData = new Offender(data);
              console.log('Offender data before save:', createOffenderData);

              const savedOffender = await createOffenderData.save();
              console.log('Offender data after save:', savedOffender);

              savedData.push(savedOffender);
            }

            console.log('Data Saved to Database:', savedData);

            resolve({ message: 'File uploaded and data saved successfully', data: savedData });
          })
          .on('error', (error) => {
            console.error('Error during CSV processing:', error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = OffenderService;
