// Importing mongoose module for MongoDB object modeling
//import mongoose from "mongoose";
const mongoose = require("mongoose");

// Defining the schema for the User model
const UserSchema = new mongoose.Schema({
    /*username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}*/

    username: String,
    email: String,
    password: String
});

// Creating a model for the User schema
const User = mongoose.model("User", UserSchema);

// Exporting the User model
//export { UserModel as User}
module.exports = User;