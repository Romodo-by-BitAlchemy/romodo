require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const loggerMorgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRouter = require("./routes/index");
const fleetRoutingRoutes = require("./routes/fleetRouting");
const loggerWinston = require("./utils/logger");
const vehicleRouter = require("./routes/vehicle");
const driverRoute = require("./routes/driver");
const userRoute = require("./routes/user");
const passengerRoute = require("./routes/passenger");
const errorHandler = require("./middlewares/ErrorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(loggerMorgan("dev"));
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

// Load environment variables from .env file
dotenv.config();

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const fleetRoutingRoutes = require("./routes/fleetRouting");
const vehicleRoute = require("./routes/vehicle.route");
const driverRoute = require("./routes/driver.route");
const userRoute = require("./routes/user.route");
const passengerRoute = require("./routes/passenger.route");
const vehicleRoutes = require("./routes/vehicleDashboardRoutes");
const driverRoutes = require("./routes/driverDashboardRoutes");
const tripRoutes = require("./routes/tripDashboardRoutes");
const issueRoutes = require("./routes/issueDashboardRoutes");
const countCompletedTripsRoute = require('./routes/countCompletedTripsRoute');
const passengerRouteReport = require("./routes/passengerReportRoutes");
const driverRouteReport = require('./routes/driverReportRoutes');
const vehicleRouteReport = require('./routes/vehicleReportRoutes');
const issueRouteReport = require('./routes/issueReportRoutes');

// Routes
app.use("/", indexRouter);
app.use("/api/fleet", fleetRoutingRoutes);
app.use("/api/v1/vehicle", vehicleRouter);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
app.use("/api/v1/vehicle", vehicleRoute);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/trips", countCompletedTripsRoute);
app.use('/api/passengers', passengerRouteReport);
app.use('/api/drivers', driverRouteReport);
app.use('/api/vehicles', vehicleRouteReport);
app.use('/api/issues', issueRouteReport);

// Error Handling Middleware
const errorHandler = require("./middlewares/ErrorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
}