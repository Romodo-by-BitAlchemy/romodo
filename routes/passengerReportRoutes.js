const express = require('express');
const router = express.Router();
const { fetchPassengers } = require('../Controllers/passengerReportController');

router.route('/').get(fetchPassengers);

module.exports = router;
