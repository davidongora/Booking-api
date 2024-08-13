const express = require('express');
const router = express.Router();
const consultancyController = require('../controllers/consultancyController');

// Generate Report (Admin)
router.post('/', consultancyController.requestConsultancy);

// View All Reports (Admin)
router.patch('/', consultancyController.actionRequest);

module.exports = router;
