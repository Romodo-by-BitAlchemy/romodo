const mongoose = require("mongoose");

/**
 * Represents the schema for the Passenger model.
 *
 * @typedef {Object} PassengerSchema
 * @property {string} email - The email of the passenger.
 * @property {string} firstName - The first name of the passenger.
 * @property {string} lastName - The last name of the passenger.
 * @property {string} nicNo - The NIC number of the passenger.
 * @property {string} gender - The gender of the passenger.
 * @property {Date} dateOfBirth - The date of birth of the passenger.
 * @property {string} contactNo - The contact number of the passenger.
 * @property {boolean} isInternal - Indicates if the passenger is internal.
 * @property {string} companyName - The company name of the passenger (required if isInternal is true).
 */
const PassengerSchema = new mongoose.Schema({
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	nicNo: { type: String, required: true },
	gender: { type: String, required: true },
	dateOfBirth: { type: Date, required: true },
	contactNo: { type: String, required: true },
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
