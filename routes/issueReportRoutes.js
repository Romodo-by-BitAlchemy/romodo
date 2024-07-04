const express = require('express');
const router = express.Router();
const { fetchIssues } = require('../Controllers/issuesReportController');

router.route('/').get(fetchIssues);

module.exports = router;
