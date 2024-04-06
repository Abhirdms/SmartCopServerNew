const uploadService = require('../services/robbery.services');

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const result = await uploadService.processUpload(req.file);

     if (result.message) {
        return res.status(200).json({ message: result.message, data: result.data });
      } else {
        return res.status(500).json({ error: 'File upload failed' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
};
