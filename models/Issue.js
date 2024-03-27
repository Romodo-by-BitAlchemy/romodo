const mongoose = require("mongoose");

const IssuesSchema = new mongoose.Schema({
	dateOccurred: Date,
	typeDescriptions: String,
	locations: String,
	cause: String,
	repairCost: Number,
	repairDate: Date,
	affectedComponents: [String],
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
