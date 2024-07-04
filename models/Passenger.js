

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
const { model, Schema } = require('mongoose');

const passengerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nicNo: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  isInternal: {
    type: Boolean,
    default: false, // Assuming default is external passenger
  },
  companyName: {
    type: String,
    required: function () {
      return this.isInternal;
    },
  },
  serviceNo: {
    type: String,
    required: function () {
      return this.isInternal;
    },
  },
  contactNo: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const PassengerModel = model('Passenger', passengerSchema);

module.exports = PassengerModel;
