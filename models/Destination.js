const mongoose = require("mongoose");
const Passenger = require("./Passenger");

/**
 * Represents a destination in the system.
 *
 * @typedef {Object} DestinationSchema
 * @property {string} destinationName - The name of the destination.
 * @property {string} placeId - The ID of the place.
 * @property {mongoose.Schema.Types.ObjectId} passenger - The ID of the passenger associated with the destination.
 */

const DestinationSchema = new mongoose.Schema({
	destinationName: {
		type: String,
		required: true,
	},
	placeId: {
		type: String,
		required: true,
	},
	passenger: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Passenger,
		required: true,
	},
});

const Destination = mongoose.model("Destination", DestinationSchema);
module.exports = Destination;
