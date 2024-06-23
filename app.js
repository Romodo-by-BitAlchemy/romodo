var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var loggerMorgan = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var fleetRoutingRoutes = require("./routes/fleetRouting");
var loggerWinston = require("./utils/logger");

var vehicleRouter = require("./routes/vehicle");
var driverRoute = require("./routes/driver");
var userRoute = require("./routes/user");
var passengerRoute = require("./routes/passenger");
var errorHandler = require("./middlewares/ErrorHandler");

var app = express();

app.use(cors({ origin: "*" }));

app.use(loggerMorgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));



app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/fleet", fleetRoutingRoutes);

const PORT = process.env.PORT || 3000;


app.use('/', indexRouter);
app.use("/api/v1/vehicle", vehicleRouter);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});

module.exports = app;
