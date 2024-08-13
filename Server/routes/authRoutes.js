const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Generate Report (Admin)
router.post('/register', authController.register);

// View All Reports (Admin)
router.post('/login', authController.login);

module.exports = router;
