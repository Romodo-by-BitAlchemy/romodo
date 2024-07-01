//Routes/driverRoutes.js
import express from 'express';
const router = express.Router();
import getDriverCounts from '../Controllers/driverDashboardController.js'; // Correct path and import

router.get('/counts', getDriverCounts);

export default router;

