// controllers/driverController.js
import asyncHandler from 'express-async-handler';
import DriverModel from '../Models/Driver.js';

export const fetchDrivers = asyncHandler(async (req, res) => {
  const drivers = await DriverModel.find({});
  res.json(drivers);
});
