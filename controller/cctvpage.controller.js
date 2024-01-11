const uploadService = require('../services/cctvpage.services');

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const result = await uploadService.processUpload(req.file);
      console.log(result);

      if (result.success) {
        return res.status(200).json({ message: result.message, data: result.data });
      } else {
        return res.status(400).json({ error: result.error.message || 'File upload failed' });
      }
    } catch (error) {
      console.error(error);
      console.log(error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
};
