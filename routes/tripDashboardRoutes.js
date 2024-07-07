const express = require('express');
const router = express.Router();
const { getTripCounts } = require('../controllers/tripDashboardController'); // Correct path and import

router.get('/counts', getTripCounts); // Route for fetching trip counts

module.exports = router;
