const uploadService = require('../services/theft.services');

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const result = await uploadService.processUpload(req.file);

      if (result.success) {
        return res.status(200).json({ message: 'File uploaded and processed successfully' });
      } else {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  },
};
