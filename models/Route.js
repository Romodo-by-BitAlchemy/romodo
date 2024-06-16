const mongoose = require("mongoose");
const Destination = require("./Destination");
const LocationSchema = require("./Location");

// Defining Routes schema
const RouteSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	startTime: {
		type: String, // ISO 8601 format: "HH:MM:SS"
		required: true,
		validate: {
			validator: function (v) {
				return timeFormat.test(v);
			},
			message: (props) => `${props.value} is not a valid time format!`,
		},
	},
	endTime: {
		type: String, // ISO 8601 format: "HH:MM:SS"
		validate: {
			validator: function (v) {
				return timeFormat.test(v);
			},
			message: (props) => `${props.value} is not a valid time format!`,
		},
	},
	startLocation: {
		type: LocationSchema,
		required: true,
	},
	destinations: {
		type: [Destination],
		required: true,
	},
});

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
