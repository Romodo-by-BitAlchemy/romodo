var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var loggerMorgan = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var fleetRoutingRoutes = require("./routes/fleetRouting");
var loggerWinston = require("./utils/logger");

var app = express();

app.use(cors({ origin: "*" }));

app.use(loggerMorgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/fleet", fleetRoutingRoutes);

const PORT = process.env.PORT || 3000;

// Start the server and keep it running
app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
	loggerWinston.info(`Server is running on port ${PORT}`);
});
