const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");
const errorHandler = require("./Middlewares/errorMiddlewares");
const vehicleRoutes = require("./Routes/vehicleDashboardRoutes");
const driverRoutes = require("./Routes/driverDashboardRoutes");
const tripRoutes = require("./Routes/tripDashboardRoutes");
const issueRoutes = require("./Routes/issueDashboardRoutes");
const countCompletedTripsRoute = require('./Routes/countCompletedTripsRoute');
const passengerRouteReport = require("./Routes/passengerReportRoutes");
const driverRouteReport = require('./Routes/driverReportRoutes');
const vehicleRouteReport = require('./Routes/vehicleReportRoutes');
const issueRouteReport = require('./Routes/issueReportRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
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
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
