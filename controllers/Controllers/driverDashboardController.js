//Controllers/driverController.js

import asyncHandler from 'express-async-handler';
import Driver from '../Models/Driver.js';

const getDriverCounts = asyncHandler(async (req, res) => {
  try {
    const noOfTotalDrivers = await Driver.countDocuments();
    const noOfAvailableDrivers = await Driver.countDocuments({ availability: true });
    const noOfUnavailableDrivers = noOfTotalDrivers - noOfAvailableDrivers;

    const counts = {
      noOfTotalDrivers,
      noOfAvailableDrivers,
      noOfUnavailableDrivers
    };

    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while fetching driver counts: ${error.message}` });
  }
});

export default getDriverCounts;
