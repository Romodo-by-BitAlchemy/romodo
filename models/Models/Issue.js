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