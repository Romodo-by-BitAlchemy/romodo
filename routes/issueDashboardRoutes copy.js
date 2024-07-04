const express = require('express');
const router = express.Router();
const { getIssuesComparison } = require('../Controllers/issueDashboardController'); // Correct path and import

router.get('/counts', getIssuesComparison); // Route for fetching issue counts

module.exports = router;
