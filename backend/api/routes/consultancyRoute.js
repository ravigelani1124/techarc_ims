const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const consultancyController = require('../controllers/consultancyController');

const router = express.Router();

router.post('/addConsultancy', authMiddleware.authenticateToken, consultancyController.addConsultancy);
 router.get('/getConsultancyList', authMiddleware.authenticateToken, consultancyController.getConsultancyList);

module.exports = router;