const express = require('express');
const router = express.Router();
const nakabandiController = require('../controller/nakabandi.controller');

router.post('/nakabandi', nakabandiController.saveNakabandiAllotment);
router.get('/nakabandidata', nakabandiController.getNakabandiAllotment);
router.post('/updateUserStatus', nakabandiController.updateUserStatus);

module.exports = router;
