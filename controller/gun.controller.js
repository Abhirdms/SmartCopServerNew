const uploadService = require('../services/gun.service');

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
   
  }
catch (error) {
  console.error(error);
  return res.status(500).json({ error: error.message ,data: error.data });
}
    //   if (!req.file) {
    //     return res.status(400).json({ error: 'No file provided' });
    //   }

    //   const result = await uploadService.processUpload(req.file);

    //   if (result.message) {
    //     return res.status(200).json({ message: result.message, data: result.data });
    //   } else {
    //     return res.status(500).json({ error: 'File upload failed' });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ error: error.message || 'Internal Server Error' });
    // }
  },
};
