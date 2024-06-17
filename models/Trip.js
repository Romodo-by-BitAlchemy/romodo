const mongoose = require("mongoose");

// Defining Trips schema
const TripSchema = new mongoose.Schema({
	driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
	vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
	destinationLocation: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Destination",
	},
	date: { type: Date, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date },
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
