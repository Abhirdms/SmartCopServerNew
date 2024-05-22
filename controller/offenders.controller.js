const uploadService = require("../services/offenders.service");

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (req.file) {
        // If a file is provided, it's an Excel upload
        const result = await uploadService.processUpload(req,req.file);
        return { message: result.message, data: result.data };
      } else if (req.body) {
        // If req.body exists, it's individual data submission
        const result = await uploadService.processUpload(req);
        return result;
      } else {
        return { error: 'No file or data provided' };
      }
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
};


// exports.offenderData = async (req, res, next) => {
//   console.log('Request object:', req);
//   try {
//     if (req.file) {
//       // If a file is provided, process CSV data
//       const result = await OffenderService.processOffenderUpload(req.file);

//       if (result.message) {
//         return res.status(200).json({ message: result.message, data: result.data });
//       } else {
//         return res.status(500).json({ error: 'File upload failed' });
//       }
//     } else {
//     const {
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       fpsNumber,
//       state,
//       district,
//       policeStation,
//       latLon,
//       highqualityphotographs
//     } = req.body;

//     console.log(
//       "Received incident data:",
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       fpsNumber,
//       state,
//       district,
//       policeStation,
//       latLon,
//       highqualityphotographs
//     );
//     const successRes = await OffenderService.addOffender(
//       name,
//       aliasName,
//       crimeHead,
//       crimeSubHead,
//       mo,
//       crimeNumber,
//       fpsNumber,
//       state,
//       district,
//       policeStation,
//       latLon,
//       highqualityphotographs
//     );

    
//     res.json({ status: true, succes: "Offender Data" });
//   } 
// }catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message || 'Internal Server Error' });
//   }
// };
