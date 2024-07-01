// routes/passengerRoutes.js
import express from 'express';
import { fetchPassengers } from '../Controllers/passengerReportController.js';

const router = express.Router();

router.route('/').get(fetchPassengers);

export default router;

