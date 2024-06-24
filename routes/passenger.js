const { Router } = require("express");
const {
	getAllPassengers,
	updatePassengerStatus,
} = require("../controllers/passengerController");

const router = Router();

router.get("/", getAllPassengers);
router.put("/:id", updatePassengerStatus);

module.exports = router;
