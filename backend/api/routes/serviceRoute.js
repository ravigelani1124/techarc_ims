const express = require('express');

const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addvisatype',  serviceController.addVisaType);
router.get('/getvisatypes', serviceController.getVisaTypes);
router.get('/getvisatypesbyconsultant/:consultant_id',  serviceController.getVisatypeByConsultantId);
module.exports = router