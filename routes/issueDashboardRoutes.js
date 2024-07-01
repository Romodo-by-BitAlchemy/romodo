// Routes/issueRoutes.js

import express from 'express';
const router = express.Router();
import { getIssuesComparison } from '../Controllers/issueDashboardController.js'; // Correct path and import

router.get('/counts', getIssuesComparison); // Route for fetching issue counts

export default router;
