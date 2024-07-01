// const mongoose = require("mongoose");

// // Defining Trips schema
// const VehiclesSchema = new mongoose.Schema({
// 	vehiclesNo: String,
// 	vehiclesType: String,
// 	registeredDate: Date,
// 	chassisNo: String,
// 	vehicleBrand: String,
// 	noOfSeats: Number,
// 	availability: String,
// 	fuelType: String,
// });

// const Trip = mongoose.model("Trip", TripSchema);
// module.exports = Trip;



import { model, Schema } from "mongoose";
// import CounterModel from './Counter';

const vehicleSchema = new Schema({
    id : {
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



const VehicleModel = model("Vehicle", vehicleSchema);

export default VehicleModel;