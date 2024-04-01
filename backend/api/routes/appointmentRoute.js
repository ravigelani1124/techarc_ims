const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addappointment', authMiddleware.authenticateToken, appointmentController.bookAppointment);
router.get('/getappointmentByUser/:id', authMiddleware.authenticateToken, appointmentController.getAppointmentByUserId);
router.get('/getappointmentByConsultant/:id', authMiddleware.authenticateToken, appointmentController.getAppointmentByConsultantId);

module.exports = router;