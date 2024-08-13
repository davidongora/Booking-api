const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Generate Report (Admin)
router.post('/', appointmentController.scheduleAppointment);

// View All Reports (Admin)
router.get('/', appointmentController.allAppointments);

module.exports = router;
