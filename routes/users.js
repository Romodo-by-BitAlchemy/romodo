var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
// Authenticate user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.status(200).json({ status: true, message: "User logged in successfully" });
});

// Handle password reset request
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajasooriyakavindhya@gmail.com",
        pass: "necv biwv lruw dvpy",
      },
    });
    var mailOptions = {
      from: "rajasooriyakavindhya@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`
    };
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.json({ message: "Email not sent" });
      } else {
        return res.json({status:true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Reset user's password
router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Password reset failed" });
  }
});

// Verify user's token
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
};

// Verify user's authentication status
router.get("/verify", verifyUser, async (req, res) => {
  return res.json({status: true, message: "User is verified"});
});

// Logout user
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({status: true, message: "User logged out successfully"});
});

*/

module.exports = router;
