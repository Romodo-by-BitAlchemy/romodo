// controllers/passengerController.js


import asyncHandler from 'express-async-handler';
import PassengerModel from '../Models/Passenger.js';

export const fetchPassengers = asyncHandler(async (req, res) => {
  const passengers = await PassengerModel.find({});
  res.json(passengers);
});
