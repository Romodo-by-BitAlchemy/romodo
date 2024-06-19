const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/ProjectDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Defining Passenger schema
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

//Definig Driver Schema
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

// Defining Routes schema
const RoutesSchema = new mongoose.Schema({
  date: Date,
  time: String,
  endLocation: String,
});

// Defining Trips schema
const TripsSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  destinationLocation: String,
  date: Date,
  time: String,
});

// Defining Payments schema
const PaymentsSchema = new mongoose.Schema({
  bookingReference: String,
  passengerName: String,
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  paymentType: String,
});

// Defining Vehicles schema
const VehiclesSchema = new mongoose.Schema({
  vehiclesNo: String,
  vehiclesType: String,
  registeredDate: Date,
  chassisNo: String,
  vehicleBrand: String,
  noOfSeats: Number,
  availability: String,
  fuelType: String,
});

// Defining Issues schema
const IssuesSchema = new mongoose.Schema({
  dateOccurred: Date,
  typeDescriptions: String,
  locations: String,
  cause: String,
  repairCost: Number,
  repairDate: Date,
  affectedComponents: [String],
});

// Compiling models
const Passenger = mongoose.model("Passenger", PassengerSchema);
const Driver = mongoose.model("Driver", DriverSchema);
const Route = mongoose.model("Route", RoutesSchema);
const Trip = mongoose.model("Trip", TripsSchema);
const Payment = mongoose.model("Payment", PaymentsSchema);
const Vehicle = mongoose.model("Vehicle", VehiclesSchema);
const Issue = mongoose.model("Issue", IssuesSchema);
const User = mongoose.model("User", UserSchema);

// Listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});