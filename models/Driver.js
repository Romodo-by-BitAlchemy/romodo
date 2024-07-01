// const mongoose = require("mongoose");

// const DriverSchema = new mongoose.Schema({
// 	firstName: String,
// 	lastName: String,
// 	nicNo: String,
// 	gender: String,
// 	dateOfBirth: Date,
// 	contactNo: String,
// 	email: String,
// 	licenseNo: String,
// 	expiryDate: Date,
// 	medicalIssues: String,
// });

// const Driver = mongoose.model("Driver", DriverSchema);
// module.exports = Driver;
// Models/Driver.js
import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     //required: false,
    //     unique: true,
    // },

    
		no: {
			type: String,
			//required: false,
			unique: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		nic: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["Male", "Female", "Other"],
		},
		dob: {
			type: Date,
			required: true,
		},
		contactNo: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		licenseNo: {
			type: String,
			required: true,
			unique: true,
		},
		licenseExpireDate: {
			type: Date,
			required: true,
		},
		medicalIssues: {
			type: String,
			default: "",
		},

		username: {
			type: String,
			required: true,
			unique: true,
		},

		availability: {
                type: Boolean,
               required: true,
             },
	},
	{ timestamps: true }
);


  // other fields as needed
  // timestamps: true adds createdAt and updatedAt fields);

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
