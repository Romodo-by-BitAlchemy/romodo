const { StandardResponse } = require("../dto/StandardResponse");
const { NotFoundError } = require("../utils/notFoundError");

/**
 * Error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
	console.error("Error caught in errorHandler:", err);

	if (err && typeof err === "object") {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode || 404).json({
				statusCode: err.statusCode || 404,
				msg: err.message,
			});
		}

		const statusCode = err.statusCode || 500;
		const message = err.message || "Internal Server Error";
		return res.status(statusCode).json({
			statusCode: statusCode,
			msg: message,
		});
	}

	// If err is not an object or is undefined
	console.error("Unexpected error type:", typeof err);
	return res.status(500).json({
		statusCode: 500,
		msg: "An unexpected error occurred",
	});
};

module.exports = errorHandler;
