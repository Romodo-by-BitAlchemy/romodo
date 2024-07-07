const express = require('express');
const router = express.Router();
const { fetchPassengers } = require('../controllers/passengerReportController');

router.route('/').get(fetchPassengers);

module.exports = router;
