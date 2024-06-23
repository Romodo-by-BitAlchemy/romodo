const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
	companyName: {
		type: String,
		required: true,
	},
	fleetOwner: {
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		contactNumber: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			match: /.+\@.+\..+/,
		},
		password: {
			type: String,
			required: true,
		},
	},
	startLocation: {
		type: String,
		required: true,
	},
	internalPassengers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Passenger",
		},
	],
	drivers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Driver",
		},
	],
	contactNumber: {
		type: String,
		required: true,
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
