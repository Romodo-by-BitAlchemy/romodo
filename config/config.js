require("dotenv").config();

module.exports = {
	projectName: process.env.PROJECT_NAME || "romodo-fleets",
	projectId: process.env.PROJECT_ID || "390204966554",
	location: process.env.LOCATION || "us-central1",
};
