const { Router } = require ("express");
const {
    createDriver, deleteDriver, getAllDrivers, getDriver, updateDriver, login, logout, forgotPassword, resetPassword, verify, getDriverByEmail
} = require("../controller/driver.controller");
const verifyUser = require('../middlewares/verifyUser'); 

const router = Router();


/** Fleet manager functions */
router.post("/", createDriver);
router.get("/:id", getDriver);
router.put("/:id", updateDriver);
router.get("/", getAllDrivers);
router.delete("/:id", deleteDriver);
router.put("/:id/status", toggleDriverStatus);


/** Driver mobile app functions */
router.post('/login', login);
router.get('/logout', logout);
router.post('/fpassword', forgotPassword);
router.post('/rpassword/:token', resetPassword);
router.get("/verify", verifyUser, verify);

router.get('/:email', getDriverByEmail);


module.exports = router;

