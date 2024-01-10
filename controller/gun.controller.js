const uploadService = require('../services/gun.service');

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const result = await uploadService.processUpload(req.file);

      if (result.success) {
        return res.status(200).json({ message: result.message, data: result.data });
      } else {
        return res.status(500).json({ error: 'File upload failed', details: result.error.message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  },
};
