const express = require('express');
const { fetchVehicles } = require('../Controllers/vehicleReportController');

const router = express.Router();

router.route('/').get(fetchVehicles);

module.exports = router;
