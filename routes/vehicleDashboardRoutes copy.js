const express = require('express');
const router = express.Router();
const { getVehicles } = require('../Controllers/vehicleDashboardController'); // Import as named export

router.get('/counts', getVehicles); // Use getVehicles directly

module.exports = router;
