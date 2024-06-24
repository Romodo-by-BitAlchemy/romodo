require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const loggerMorgan = require("morgan");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/fleet", fleetRoutingRoutes);
app.use("/api/v1/vehicle", vehicleRouter);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;
