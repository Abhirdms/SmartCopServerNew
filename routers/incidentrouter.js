const express = require('express');
const router = express.Router();
const Incident = require('../model/incident');
const IncidentController=require('../controller/incident.controller');

router.post('/create-incident',IncidentController.incident);






module.exports = router;
