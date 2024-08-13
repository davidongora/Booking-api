const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Generate Report (Admin)
router.post('/', paymentController.makePayment);

// View All Reports (Admin)
router.get('/', paymentController.allPayments);

module.exports = router;
