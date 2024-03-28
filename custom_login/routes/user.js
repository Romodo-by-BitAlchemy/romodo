import express from "express"; // Express framework for routing
import bcrypt from "bcrypt";// Bcrypt for hashing passwords
const router = express.Router(); // Route object for handling different routes
import { User } from "../models/User.js"; // User model for interacting with the database
import jwt from "jsonwebtoken"; // Jsonwebtoken for creating and verifying tokens
import nodemailer from "nodemailer"; // Nodemailer for sending emails



// Route for user registration
router.post("/signup", async (req, res) => {
  // Destructuring username, email, and password from the request body
  const { username, email, password } = req.body;

  // Checking if the user already exists with the provided email
  const user = await User.findOne({ email });
  if (user) {
    // If user already exists, return a 400 status with a JSON response
    return res.status(400).json({ message: "User already exists" });
  }

  // Hashing the password using bcrypt with a salt of 10 rounds
  const hashpassword = await bcrypt.hash(password, 10);

  // Creating a new user instance with the provided username, email, and hashed password
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  // Saving the new user to the database
  await newUser.save();

  // Returning a 201 status with a JSON response indicating successful account creation
  return res
    .status(201)
    .json({ status: true, message: "User created the account successfully" });
});




// Route for user login
router.post("/login", async (req, res) => {
  // Destructuring username and password from the request body
  const { username, password } = req.body;

  // Finding the user by username in the database
  const user = await User.findOne({ username });
  if (!user) {
    // If user is not found, return a 400 status with a JSON response
    return res.status(400).json({ message: "User is not registered" });
  }

  // Comparing the provided password with the hashed password stored in the database
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    // If passwords don't match, return a 400 status with a JSON response
    return res.status(400).json({ message: "Invalid password" });
  }

  // If username and password are correct, generate a JWT token
  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h", // Token expiration time
  });

  // Set the token as a cookie in the response with HTTPOnly flag and maximum age
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  // Return a 200 status with a JSON response indicating successful login
  return res
    .status(200)
    .json({ status: true, message: "User logged in successfully" });
});




// Route for user password reset
router.post("/forgotPassword", async (req, res) => {
  // Extracting email from the request body
  const { email } = req.body;
  try {
    // Finding the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      // If user is not found, return a 400 status with a JSON response
      return res.status(400).json({ message: "User is not registered" });
    }

    // Generating a token for password reset with a 5-minute expiration
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    // Creating a transporter for sending emails (using Gmail here)
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajasooriyakavindhya@gmail.com", // Replace with your Gmail address
        pass: "necv biwv lruw dvpy", // Replace with your Gmail app password
      },
    });

    // Constructing email options
    var mailOptions = {
      from: "rajasooriyakavindhya@gmail.com", // Sender email address
      to: email, // Receiver email address
      subject: "Reset Password", // Email subject
      text: `http://localhost:5173/resetPassword/${token}` // Reset password link in the email body. in here attach a token to authenticate is this the user who requested the password reset
    };

    // Sending the email
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        // If there's an error sending the email, return a JSON response
        return res.json({ message: "Email not sent" });
      } else {
        // If email is sent successfully, return a JSON response
        return res.json({status:true, message: "Email sent" });
      }
    });
  } catch (err) {
    // Catching and logging any errors that occur during the process
    console.log(err);
  }
});




// Route for resetting the password
router.post("/resetPassword/:token", async (req, res) => {
  // Extracting token from the request parameters
  const { token } = req.params;

  // Extracting password from the request body
  const { password } = req.body;
  
  try {
    // Verifying the token to get the user's ID
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    // Hashing the new password
    const hashPassword = await bcrypt.hash(password, 10);

    // Updating the user's password in the database
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });

    // Returning a JSON response indicating successful password reset
    return res.json({ status: true, message: "Password reset successfully" });
  } catch (err) {
    // Catching and logging any errors that occur during the process
    console.log(err);

    // Returning a JSON response indicating password reset failure
    return res.json({ message: "Password reset failed" });
  }
});




// Middleware for verifying the user
const verifyUser = async (req, res, next) => {
  try {
    // Extracting the token from the request cookies
    const token = req.cookies.token;
    
    // If token is not present, return an unauthorized JSON response
    if (!token) {
      return res.json({ status: false, message: "Unauthorized" });
    }
    
    // Verifying the token using the secret key
    const decoded = await jwt.verify(token, process.env.KEY);
    
    // If verification is successful, call the next middleware or route handler
    next();
  } catch (err) {
    // If an error occurs during verification, return a JSON response with the error
    return res.json(err);
  }
};




// Route for verifying the user
router.get("/verify", verifyUser, async (req, res) => {
  // If the middleware passes, indicating user is verified, return a JSON response
  return res.json({status: true, message: "User is verified"});
});




// Route for logging out the user
router.get("/logout", (req, res) => {
  // Clearing the token cookie to log out the user
  res.clearCookie("token");
  // Returning a JSON response indicating successful logout
  return res.json({status: true, message: "User logged out successfully"});
});




export { router as UserRouter };
