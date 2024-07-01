// Routes/driverRoutes.js
import express from 'express';
import { fetchDrivers } from '../Controllers/driverReportController.js';

const router = express.Router();

router.route('/').get(fetchDrivers);

export default router;
