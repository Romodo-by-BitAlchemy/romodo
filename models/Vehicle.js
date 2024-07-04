const { model, Schema } = require('mongoose');


const vehicleSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  no: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  chassisNo: {
    type: String,
    required: true,
    unique: true
  },
  productionYear: {
    type: Date,
    required: true
  },
  ac: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  fuelType: {
    type: String,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const VehicleModel = model('Vehicle', vehicleSchema);

module.exports = VehicleModel;
