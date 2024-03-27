const mongoose = require("mongoose");

// Defining Payments schema
const PaymentSchema = new mongoose.Schema({
	bookingReference: String,
	passengerName: String,
	tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
	passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
	paymentType: String,
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
