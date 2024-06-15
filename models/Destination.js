const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
	//GeoJSON Point
	type: {
		type: String,
		enum: ["Point"],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

const DestinationSchema = new mongoose.Schema({
	destinationName: {
		type: String,
		required: true,
	},
	location: {
		type: LocationSchema,
		required: true,
	},
});
