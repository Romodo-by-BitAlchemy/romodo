const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	nicNo: String,
	gender: String,
	dateOfBirth: Date,
	contactNo: String,
	serviceNo: String,
	isInternal: { type: Boolean, required: true },
	companyName: {
		type: String,
		required: function () {
			return this.isInternal;
		},
	},
});

const Passenger = mongoose.model("Passenger", PassengerSchema);
module.exports = Passenger;
