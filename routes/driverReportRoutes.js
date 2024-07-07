const express = require('express');
const { fetchDrivers } = require('../controllers/driverReportController');

const router = express.Router();

router.route('/').get(fetchDrivers);

module.exports = router;
