const express = require('express');
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addDocument', authMiddleware.authenticateToken, documentController.addDocument);
router.get('/getDocuments', authMiddleware.authenticateToken, documentController.getDocuments);
router.post('/updateDocument/:id', authMiddleware.authenticateToken, documentController.updatedDocument);
router.post('/selectedServicesDoc', authMiddleware.authenticateToken, documentController.consultantSelectedServicesDocument);
router.post('/getSelectedServicesDoc',  documentController.getConsultantSelectedServicesDocument);
router.post('/getDocBasedOnSubApplicationAndConsultant',documentController.getDocBasedOnSubApplicationAndConsultant);


module.exports = router