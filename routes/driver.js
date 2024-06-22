const { Router } = require ("express");
const {
    createDriver, deleteDriver, getAllDrivers, getDriver, updateDriver
} = require("../controller/driver.controller");

const router = Router();

router.post("/", createDriver);
router.get("/:id", getDriver);
router.put("/:id", updateDriver);
router.get("/", getAllDrivers);
router.delete("/:id", deleteDriver);


module.exports = router;
