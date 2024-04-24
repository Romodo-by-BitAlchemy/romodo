// Importing mongoose module for MongoDB object modeling
import mongoose from "mongoose";

// Defining the schema for the User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// Creating a model for the User schema
const UserModel = mongoose.model("User", UserSchema);

// Exporting the User model
export { UserModel as User}