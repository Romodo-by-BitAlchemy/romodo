// Routes/vehicleRoutes.js
import express from 'express';
import { fetchVehicles } from '../Controllers/vehicleReportController.js';

const router = express.Router();

router.route('/').get(fetchVehicles);

export default router;
