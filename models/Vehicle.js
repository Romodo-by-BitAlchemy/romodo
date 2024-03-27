const mongoose = require("mongoose");

// Defining Trips schema
const VehiclesSchema = new mongoose.Schema({
	vehiclesNo: String,
	vehiclesType: String,
	registeredDate: Date,
	chassisNo: String,
	vehicleBrand: String,
	noOfSeats: Number,
	availability: String,
	fuelType: String,
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
