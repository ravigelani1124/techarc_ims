const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/addapplicationtype', authMiddleware.authenticateToken, applicationController.addApplicationType);
router.get('/getapplicationtype', authMiddleware.authenticateToken, applicationController.getApplicationType);
router.post('/updateapplicationtype/:id', authMiddleware.authenticateToken, applicationController.updateApplicationType);
router.post('/addsubapplicationtype', authMiddleware.authenticateToken, applicationController.addSubApplicationType);
router.get('/getapplicationwithsubtype', authMiddleware.authenticateToken, applicationController.getAllApplicationWithSubType);
router.put('/updatesubapplicationtype/:id', authMiddleware.authenticateToken, applicationController.updateSubApplicationType);
router.post('/addconsultantselectedservices', authMiddleware.authenticateToken, applicationController.addConsultantSelectedServices);
router.get('/getconsultantselectedservices/:id',authMiddleware.authenticateToken,  applicationController.getConsultantSelectedServices);
module.exports = router