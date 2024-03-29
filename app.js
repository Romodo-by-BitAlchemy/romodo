require("newrelic");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Make sure to require the New Relic agent at the top of your main file
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

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
