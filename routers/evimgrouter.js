const express = require('express');
const multer = require('multer');
const Evidence = require('../model/evidence');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/evimg', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const newFile = {
            fileType: req.body.fileType,
            fileName: req.file.originalname,
            filePath: req.file.path,
        };

        console.log('Received file data:', newFile);

        // Here, you can save the file information directly to the database
        // without associating it with a specific incident

        // Example:
        const savedFile = await Evidence.create({ uploadedFiles: [newFile] });

        console.log('File saved in the database:', savedFile);
        return res.status(200).send('File uploaded and incident created.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error.');
    }
});

module.exports = router;
