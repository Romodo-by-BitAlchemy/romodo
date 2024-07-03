//Routes/issueReportRoutes.js
import express from 'express';
import { fetchIssues } from '../Controllers/issuesReportController.js';

const router = express.Router();

router.route('/').get(fetchIssues);

export default router;
