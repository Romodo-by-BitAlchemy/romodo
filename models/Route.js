const mongoose = require("mongoose");
const Destination = require("./Destination");

// Defining Routes schema
/**
 * Represents the schema for a route.
 *
 * @typedef {Object} RouteSchema
 * @property {Date} date - The date of the route.
 * @property {Date} startTime - The start time of the route in ISO 8601 format: "HH:MM:SS".
 * @property {Date} [endTime] - The end time of the route in ISO 8601 format: "HH:MM:SS".
 * @property {LocationSchema} startLocation - The starting location of the route.
 * @property {Destination[]} destinations - An array of destinations for the route.
 */

const RouteSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
	},
	startPlaceId: {
		type: String,
		required: true,
	},
	destinations: {
		type: [Destination],
		required: true,
	},
});

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
