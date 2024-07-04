const express = require('express');
const router = express.Router();
const getDriverCounts = require('../Controllers/driverDashboardController'); // Correct path and import

router.get('/counts', getDriverCounts);

module.exports = router;
