const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Generate Report (Admin)
router.post('/', messageController.sendMessage);

// View All Reports (Admin)
router.get('/', messageController.messagesBetween);

module.exports = router;
