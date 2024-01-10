const express = require('express');
const router = express.Router();
const Evidence = require('../model/evidence');
const EvidenceController=require('../controller/evidence.controller');

router.post('/create-evidence',EvidenceController.evidence);






module.exports = router;
