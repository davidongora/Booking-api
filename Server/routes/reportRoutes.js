const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

// Generate Report (Admin)
router.post('/', reportsController.generateReport);

// View All Reports (Admin)
router.get('/', reportsController.allReports);

module.exports = router;
