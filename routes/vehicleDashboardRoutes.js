//Routes/vehicleRoutes.js
import express from 'express';
const router = express.Router();
import { getVehicles } from '../Controllers/vehicleDashboardController.js'; // Import as named export

router.get('/counts', getVehicles); // Use getVehicles directly

export default router;


