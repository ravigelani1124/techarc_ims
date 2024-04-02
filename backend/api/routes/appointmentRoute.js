const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addappointment', authMiddleware.authenticateToken, appointmentController.bookAppointment);
router.get('/getappointmentByUser/:id',  appointmentController.getAppointmentByUserId);
router.get('/getappointmentByConsultant/:id',  appointmentController.getAppointmentByConsultantId);

module.exports = router;