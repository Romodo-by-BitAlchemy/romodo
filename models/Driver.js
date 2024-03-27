const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	nicNo: String,
	gender: String,
	dateOfBirth: Date,
	contactNo: String,
	email: String,
	licenseNo: String,
	expiryDate: Date,
	medicalIssues: String,
});

const Driver = mongoose.model("Driver", DriverSchema);
module.exports = Driver;
