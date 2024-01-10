// // const express = require('express');
// // const multer = require('multer');
// // const Incident = require('../model/incident');

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, 'uploads/');
// //     },
// //     filename: function (req, file, cb) {
// //         cb(null, Date.now() + '-' + file.originalname);
// //     },
// // });

// // const upload = multer({ storage: storage });

// // router.post('/img', upload.single('file'), async (req, res) => {
// //     try {
// //         if (!req.file) {
// //             return res.status(400).send('No file uploaded.');
// //         }

// //         const newFile = {
// //             fileType: req.body.fileType,
// //             fileName: req.file.originalname,
// //             filePath: req.file.path,
// //         };

// //         // const incidentId = 'incidentId'; // Replace with the actual incident ID
// //         // const updatedIncident = await Incident.findByIdAndUpdate(
// //         //     incidentId,
// //         //     { $push: { uploadedFiles: newFile } },
// //         //     { new: true }
// //         // );

// //         // if (!updatedIncident) {
// //         //     return res.status(500).send('Failed to update incident with file information.');
// //         // }

// //         // return res.status(200).send('File uploaded and incident updated.');
// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).send('Internal server error.');
// //     }
// // });

// // module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const Incident = require('../model/incident');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// router.post('/img', upload.array('files', 5), async (req, res) => {
//     try {
//         const files = req.files;

//         if (!files || files.length === 0) {
//             return res.status(400).send('No files uploaded.');
//         }

//         const newFiles = files.map(file => ({
//             fileType: req.body.fileType,
//             fileName: file.originalname,
//             filePath: file.path,
//         }));
//         console.log('Received file data:', newFile);

//         return res.status(200).json({ files: newFiles });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal server error.');
//     }
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const Incident = require('../model/incident');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null,file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/img', upload.single('file'), async (req, res) => {
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
        const savedFile = await Incident.create({ uploadedFiles: [newFile] });

        console.log('File saved in the database:', savedFile);
        return res.status(200).send('File uploaded and incident created.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error.');
    }
});

module.exports = router;
