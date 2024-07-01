// Controllers/tripController.js

import asyncHandler from 'express-async-handler';
import Trip from '../Models/Trip.js';

export const getTripCounts = asyncHandler(async (req, res) => {
  try {
    const totalTrips = await Trip.countDocuments();
    const cancelledTrips = await Trip.countDocuments({ status: false });
    const scheduledTrips = totalTrips - cancelledTrips;

    const tripCounts = {
      totalTrips,
      scheduledTrips,
      cancelledTrips
    };

    res.status(200).json({
      trips: tripCounts,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch trip counts: ${error.message}` });
  }
});
