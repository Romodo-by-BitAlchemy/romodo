require("newrelic");
var express = require("express");
var path = require("path");
/**
 * Middleware for parsing cookies.
 * @type {Function}
 */
/**
 * Parses the cookie header and populates `req.cookies` with an object containing the parsed cookies.
 *
 * @param {string} secret - The secret used to sign the cookies.
 * @param {object} options - The options for parsing the cookies.
 * @returns {function} - The middleware function that parses the cookies.
 */
/**
 * Middleware for parsing cookies.
 * @type {Function}
 */
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Set the port your application will listen on.
const PORT = process.env.PORT || 3000;

// Start the server and keep it running
app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
