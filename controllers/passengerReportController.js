const asyncHandler = require('express-async-handler');
const PassengerModel = require('../models/Passenger');

const fetchPassengers = asyncHandler(async (req, res) => {
  const passengers = await PassengerModel.find({});
  res.json(passengers);
});

module.exports = { fetchPassengers };
