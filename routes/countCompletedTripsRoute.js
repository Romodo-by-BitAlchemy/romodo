// countCompletedTripsController.js

import express from 'express';
import { countCompletedTrips } from '../Controllers/countCompletedTripsController.js';

const router = express.Router();

// Route to count completed trips each day for the past month
router.get('/daily-completed', countCompletedTrips);

export default router;
