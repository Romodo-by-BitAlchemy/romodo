// Importing necessary modules
import express from 'express';                  // Express for creating the server
import dotenv from 'dotenv';                    // Dotenv for managing environment variables
import mongoose from 'mongoose';                // Mongoose for MongoDB object modeling
import cookieParser from 'cookie-parser';       // Cookie-parser for parsing cookies
import { UserRouter } from './routes/user.js';  // UserRouter for handling user routes
import cors from 'cors';                        // Cors for enabling Cross-Origin Resource Sharing
dotenv.config();                                // Load environment variables from a .env file into process.env

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS with specified options
app.use(cors(
    {
        origin: ["http://localhost:5173"], // Allow requests from the specified origin
        credentials: true                // Allow cookies to be sent and received
    }

));

// Middleware to parse cookies
app.use(cookieParser());

// Route handling for user authentication
app.use('/auth', UserRouter);

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/authentic')

// Start the server and listen for incoming requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});