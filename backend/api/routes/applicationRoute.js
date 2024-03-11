const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/addapplicationtype', authMiddleware.authenticateToken, applicationController.addApplicationType);
module.exports = router