const express = require('express');

const visaTypeController = require('../controllers/visaTypeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addvisatype',  visaTypeController.addVisaType);
router.get('/getvisatypes', visaTypeController.getVisaTypes);
router.get('/getvisatypesbyconsultant/:consultant_id',  visaTypeController.getVisatypeByConsultantId);
module.exports = router