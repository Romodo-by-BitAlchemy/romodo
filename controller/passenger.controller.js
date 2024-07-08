
const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const { Passenger } = require("../models/SchemaTypes");
const PassengerModel = require("../models/Passenger");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator = require('validator');

exports.getAllPassengers = tryCatch(async (req, res) => {
    const passenger= await PassengerModel.find();
    const response = { statusCode: 200, msg: "OK", data: passenger };
    res.status(200).send(response);
});



exports.updatePassengerStatus = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // expects 'deactivate' or 'activate' in the request body

    // Determine the new status based on the action
    const isActive = action === 'activate';
    const passenger = await PassengerModel.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!passenger) {
        return res.status(404).send({ statusCode: 404, msg: "Passenger not found" });
    }

    // Prepare email notification
    const subject = isActive ? "Account Reactivation Notice" : "Account Deactivation Notice";
    const text = `Dear ${passenger.firstName},

Your account has been ${isActive ? 'reactivated' : 'deactivated'}. If you have any questions, please contact support.

Best regards,
ROMODO`;

    // Send email notification
    await sendEmail(passenger.email, subject, text);

    res.status(200).send({ statusCode: 200, msg: `Passenger ${isActive ? 'reactivated' : 'deactivated'}` });
});


/** Passenger mobile app */

exports.signup = tryCatch(async (req, res) => {
  const { firstName , lastName ,nicNo, username, email, password , gender, isInternal,companyName,serviceNo, contactNo, birthday } = req.body;

  const validGenders = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({ error: 'Invalid gender' });
  }

    const passenger = await PassengerModel.findOne({ email });
    if (passenger) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (isInternal && (!companyName || !serviceNo)) {
      return res.status(400).json({ error: 'Company Name and Service No are required for internal users' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const formattedBirthday = new Date(birthday).toISOString().split('T')[0];


    const newPassenger = new PassengerModel({ 
        firstName,
        lastName,
        nicNo,
        email, 
        username,
        password: hashedPassword,
        gender,
        contactNo,
        birthday: formattedBirthday,
        isInternal,
        companyName: isInternal ? companyName : undefined,
        serviceNo: isInternal ? serviceNo : undefined
    });

    await newPassenger.save();

    return res.status(201).json({ status: true, message: 'User registered successfully' });
});

exports.login = tryCatch(async (req, res) => {
  const { username, password } = req.body;

    const passenger = await PassengerModel.findOne({ username});
    console.log(passenger);

    if (!passenger) {
      return res.status(400).json({ error: 'User not registered.' });
    }

    if (passenger.isActive=== false) {
      return res.status(403).json({ error: 'You are deactivated. Please check your email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, passenger.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ username: passenger.username }, process.env.KEY, { expiresIn: '3h' ,});
   
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.status(200).json({ status: true, message: 'Logged in successfully' , token: token, data: passenger});
  
});



exports.forgotPassword = tryCatch(async (req, res) => {
  const { email } = req.body;

  
    const passenger = await PassengerModel.findOne({ email });
    if (!passenger) {
      return res.status(400).json({ message: 'Passenger not registered.' });
    }

    const token = jwt.sign({ username: passenger.username }, process.env.KEY, { expiresIn: '25m', });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rajasooriyakavindhya@gmail.com",
            pass: "necv biwv lruw dvpy",
        },
    });
    
    const mailOptions = {
        from: "rajasooriyakavindhya@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `http://127.0.0.1:58848/rpassword/${token}` // problem in path
        

    };
    
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            return res.status(401).json({ message: "Email not sent" });
        } else {
            return res.status(200).json({ status: true, message: "Email sent" });
        }
    });

   
  
});

exports.resetPassword = tryCatch(async (req, res) => {
  const {token} = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    
    await PassengerModel.findByIdAndUpdate(id, { password: hashPassword });
    
    return res.status(200).json({ status: true, message: "Password reset successfully" });
} catch (err) {
    console.log(err);
    return res.json({ message: "Password reset failed" });
}
});

exports.verify = tryCatch(async (req, res) => {
    return res.json({ status: true, message: "User is verified" });
});


exports.logout = tryCatch(async(req, res) => {
  
  return res.status(204).json({ status: true, message: 'Logged out successfully.' });
});




// Get Passenger by ID
exports.getPassengerByEmail = tryCatch(async (req, res) => {
  const { email } = req.params;
  console.log(`Received request to fetch passenger by email: ${email}`);

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const passenger = await PassengerModel.findOne({ email });
  console.log(`Passenger: ${passenger}`);
  if (!passenger) {
    const errorResponse = { statusCode: 400, msg: `Passenger with email ${email} not found!` };
    return res.status(404).json(errorResponse);
  }

  const response = { statusCode: 200, msg: "OK", data: passenger };
  res.status(200).send(response);
});


// Update Passenger
exports.updatePassenger = tryCatch(async (req, res) => {
  const { email } = req.params;
  const updateFields = {};

  if (req.body.email) {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    updateFields.email = req.body.email;
  }
  if (req.body.firstName) updateFields.firstName = req.body.firstName;
  if (req.body.lastName) updateFields.lastName = req.body.lastName;
  if (req.body.nicNo) updateFields.nicNo = req.body.nicNo;
  if (req.body.gender) {
    if (!['Male', 'Female', 'Other'].includes(req.body.gender)) {
      return res.status(400).json({ error: 'Invalid gender' });
    }
    updateFields.gender = req.body.gender;
  }
  if (req.body.dateOfBirth) updateFields.dateOfBirth = new Date(req.body.dateOfBirth);
  if (req.body.contactNo) {
    if (!/^\d{10}$/.test(req.body.contactNo)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
    updateFields.contactNo = req.body.contactNo;
  }
  if (req.body.serviceNo) updateFields.serviceNo = req.body.serviceNo;
  if (typeof req.body.isInternal !== 'undefined') {
    updateFields.isInternal = req.body.isInternal;
  }
  if (req.body.isInternal && req.body.companyName) {
    updateFields.companyName = req.body.companyName;
  }

  if (req.body.password) {
    if (!validator.isStrongPassword(req.body.password)) {
      return res.status(400).json({ error: 'Password does not meet strength requirements' });
    }
    updateFields.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const passenger = await PassengerModel.findOneAndUpdate(
      { email},
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!passenger) {
      return res.status(404).json({ error: 'Passenger not found' });
    }
    return res.status(200).json({ status: true, message: 'Passenger updated successfully', data: passenger });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});