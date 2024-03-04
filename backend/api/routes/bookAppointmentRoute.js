const express = require('express');

const bookAppointmentController = require('../controllers/bookAppointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addtimeslot', bookAppointmentController.addTimeSlot);
router.get('/gettimeslot/:id', authMiddleware.authenticateToken, bookAppointmentController.getTimeSlotById);
module.exports = router