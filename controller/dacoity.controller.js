const uploadService = require('../services/dacoity.services');

module.exports = {
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }
      console.log('Request Object:', req); 

      const result = await uploadService.processUpload(req.file);
      console.log(result);

      if (result.success) {
        return res.status(200).json({ message: 'File uploaded and processed successfully' });
      } else {
        return res.status(500).json({ error: 'File upload failed' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  },
};
