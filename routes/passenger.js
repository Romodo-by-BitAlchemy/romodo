const { Router } = require("express");
const { getAllPassengers, updatePassengerStatus,  updatePassenger, signup, login, logout, forgotPassword, resetPassword, verify, getPassengerByEmail } = require('../controller/passenger.controller');
const verifyUser = require('../middlewares/verifyUser'); 

const router = Router();

router.get("/", getAllPassengers);
router.put("/:id", updatePassengerStatus);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/fpassword', forgotPassword);
router.post('/rpassword/:token', resetPassword);
router.get("/verify", verifyUser, verify);

router.get('/:email', getPassengerByEmail);
router.put('/:email', updatePassenger);

module.exports = router;



