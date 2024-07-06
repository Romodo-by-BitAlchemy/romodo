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






const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
  incidentType: {
    type: String,
    enum: ['Malfunction', 'Accident'],
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
    required: function() { return this.rerouting === true; }
  },
  reroutingNewDriverNo: {
    type: String,
    required: function() { return this.rerouting === true; }
  }
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
