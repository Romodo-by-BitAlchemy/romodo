const express = require('express');
const { fetchDrivers } = require('../Controllers/driverReportController');

const router = express.Router();

router.route('/').get(fetchDrivers);

module.exports = router;
