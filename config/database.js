const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/ProjectDB", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Successfully connected to the database");
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
};

module.exports = connectDB;
