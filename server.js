import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import errorHandler from "./Middlewares/errorMiddlewares.js";
import vehicleRoutes from "./Routes/vehicleDashboardRoutes.js";
import driverRoutes from "./Routes/driverDashboardRoutes.js";
import tripRoutes from "./Routes/tripDashboardRoutes.js";
import issueRoutes from "./Routes/issueDashboardRoutes.js";
import passengerReportRoutes from './Routes/passengerReportRoutes.js';
import driverReportRoutes from './Routes/driverReportRoutes.js';
import vehicleReportRoutes from './Routes/vehicleReportRoutes.js';
import issueReportRoutes from './Routes/issueReportRoutes.js';


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
app.use('/api/passengers', passengerReportRoutes);
app.use('/api/drivers', driverReportRoutes);
app.use('/api/vehicles', vehicleReportRoutes);
app.use('/api/issues', issueReportRoutes);



// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
