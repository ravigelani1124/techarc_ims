const express = require('express');
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addDocument', authMiddleware.authenticateToken, documentController.addDocument);
router.get('/getDocuments', authMiddleware.authenticateToken, documentController.getDocuments);
module.exports = router