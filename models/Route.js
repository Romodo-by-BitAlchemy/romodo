const mongoose = require("mongoose");

// Defining Routes schema
const RouteSchema = new mongoose.Schema({
	date: Date,
	time: String,
	endLocation: String,
});

const Route = mongoose.model("Route", RouteSchema);
module.exports = Route;
