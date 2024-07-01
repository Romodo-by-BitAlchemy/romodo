// const mongoose = require("mongoose");

// const IssuesSchema = new mongoose.Schema({
// 	dateOccurred: Date,
// 	typeDescriptions: String,
// 	locations: String,
// 	cause: String,
// 	repairCost: Number,
// 	repairDate: Date,
// 	affectedComponents: [String],
// });

// const Trip = mongoose.model("Trip", TripSchema);
// module.exports = Trip;

// //Models/Issue.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const issueSchema = new Schema({
  nameOfTheIssues: {
    type: String,
    enum: ['malfunction', 'accident'],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rerouting: {
    type: Boolean,
    required: true
  },
  reroutingNewVehicleNo: {
    type: String,
    required: false
  },
  reroutingNewDriverNo: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
