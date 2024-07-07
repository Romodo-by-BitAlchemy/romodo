const winston = require("winston");
const path = require("path");
const fs = require("fs");
const appRoot = require("app-root-path");

// Define the log directory and log file path relative to the project root
const logDirectory = path.join(appRoot.path, "logs");
const logFile = path.join(logDirectory, "application.log");

// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

// Configure Winston logger
const logger = winston.createLogger({
	level: "debug", // Log all levels
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level.toUpperCase()}: ${message}`;
		})
	),
	transports: [new winston.transports.File({ filename: logFile })],
});

// Export the logger
module.exports = logger;
