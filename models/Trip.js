const mongoose = require("mongoose");

// Defining Trips schema
const TripSchema = new mongoose.Schema({
	driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
	vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
	destinationLocation: String,
	date: Date,
	time: String,
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
