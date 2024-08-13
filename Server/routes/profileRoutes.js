const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Generate Report (Admin)
router.post('/', profileController.updateProfile);

// View All Reports (Admin)
router.get('/', profileController.allProfiles);


module.exports = router;
