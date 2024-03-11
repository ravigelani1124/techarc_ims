const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/addapplicationtype', authMiddleware.authenticateToken, applicationController.addApplicationType);
router.get('/getapplicationtype', authMiddleware.authenticateToken, applicationController.getApplicationType);
router.post('/updateapplicationtype/:id', authMiddleware.authenticateToken, applicationController.updateApplicationType);
module.exports = router