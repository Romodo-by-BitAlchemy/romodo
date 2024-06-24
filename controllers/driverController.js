const tryCatch = require("../utils/tryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const DriverModel = require("../models/Driver");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const validator = require("validator");
const sendEmail = require("../utils/sendEmail");

function generatePassword(length) {
	return crypto.randomBytes(length).toString("hex").slice(0, length);
}

function generateUsername(name) {
	return (
		name.toLowerCase().replace(/\s/g, "") + Math.floor(Math.random() * 1000)
	);
}

/**
 * Create a driver
 */
exports.createDriver = tryCatch(async (req, res) => {
	const driver = req.body;

	console.log(driver);

	const username = generateUsername(driver.lastName);
	const password = generatePassword(8);

	const hashedPassword = await bcrypt.hash(password, 10);

	driver.username = username;
	driver.password = hashedPassword;

	const driverModel = new DriverModel(driver);
	const savedDriver = await driverModel.save();

	await sendEmail(
		driver.email,
		"Your Account Details",
		`Your account has been created successfully.\nUsername: ${username}\nPassword: ${password}`
	);

	const response = {
		statusCode: 201,
		msg: "created successfully",
		data: savedDriver._id,
	};
	res.status(201).send(response);
});

/**
 * get all drivers
 */
exports.getAllDrivers = tryCatch(async (req, res) => {
	const drivers = await DriverModel.find();
	const response = { statusCode: 200, msg: "OK", data: drivers };
	res.status(200).send(response);
});

/**
 * get a driver
 */
exports.getDriver = tryCatch(async (req, res) => {
	const driver = await DriverModel.findOne({ _id: req.params.id });

	if (!driver) {
		const errorResponse = {
			statusCode: 400,
			msg: `${req.params.id} driver not found!`,
		};
		return res.status(404).send(errorResponse);
	}
	const response = { statusCode: 200, msg: "OK", data: driver };
	res.status(200).send(response);
});

/**
 * update a driver
 */
exports.updateDriver = tryCatch(async (req, res) => {
	const driverId = req.params.id;
	console.log(req.body);
	const updateFields = {};
	const originalFields = {};

	if (req.body.email) {
		if (!validator.isEmail(req.body.email)) {
			return res.status(400).json({ error: "Invalid email" });
		}
		updateFields.email = req.body.email;
	}
	if (req.body.firstName) updateFields.firstName = req.body.firstName;
	if (req.body.lastName) updateFields.lastName = req.body.lastName;
	if (req.body.nic) updateFields.nic = req.body.nic;
	if (req.body.gender) {
		if (!["Male", "Female", "Other"].includes(req.body.gender)) {
			return res.status(400).json({ error: "Invalid gender" });
		}
		updateFields.gender = req.body.gender;
	}
	if (req.body.dob) updateFields.dob = new Date(req.body.dob);
	if (req.body.contactNo) {
		if (!/^\d{10}$/.test(req.body.contactNo)) {
			return res.status(400).json({ error: "Invalid phone number" });
		}
		updateFields.contactNo = req.body.contactNo;
	}
	if (req.body.licenseNo) updateFields.licenseNo = req.body.licenseNo;
	if (req.body.licenseExpireDate)
		updateFields.licenseExpireDate = new Date(req.body.licenseExpireDate);
	if (req.body.medicalIssues)
		updateFields.medicalIssues = req.body.medicalIssues;

	try {
		const driver = await DriverModel.findOneAndUpdate(
			{ _id: driverId },
			{ $set: updateFields },
			{ new: true, runValidators: true }
		);

		if (!driver) {
			return res.status(404).json({ error: "Driver not found" });
		}

		// Send email with the updated data
		await sendEmail(
			driver.email || updateFields.email,
			"Your Information Has Been Updated",
			`Your information has been updated with the following details:\n${JSON.stringify(
				updateFields,
				null,
				2
			)}`
		);

		return res.status(200).json({
			status: true,
			message: "Driver updated successfully",
			data: driver,
		});
	} catch (err) {
		return res.status(500).json({ error: "Server error" });
	}
});

/**
 * delete a driver
 */
exports.deleteDriver = tryCatch(async (req, res) => {
	console.log(req.params);

	const driver = await DriverModel.findOne({ _id: req.params.id });
	if (!driver) {
		const errorResponse = {
			statusCode: 404,
			msg: `${req.params.id} driver not found!`,
		};
		return res.status(404).send(errorResponse);
	}
	await DriverModel.findByIdAndDelete({ _id: req.params.id });

	// Send email to the driver notifying about the deletion
	await sendEmail(
		driver.email,
		"Account Deletion",
		"Your account has been deleted from our system."
	);

	res.status(204).send();
});
