const mongoose = require("mongoose");
const Passenger = require("./Passenger");

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
