// Routes/tripRoutes.js

import express from 'express';
const router = express.Router();
import { getTripCounts } from '../Controllers/tripDashboardController.js'; // Correct path and import

router.get('/counts', getTripCounts); // Route for fetching trip counts

export default router;
