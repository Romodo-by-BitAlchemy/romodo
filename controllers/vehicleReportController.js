// controllers/vehicleController.js
import asyncHandler from 'express-async-handler';
import VehicleModel from '../Models/Vehicle.js';

export const fetchVehicles = asyncHandler(async (req, res) => {
  const vehicles = await VehicleModel.find({});
  res.json(vehicles);
});
