const express = require("express");
const router = express.Router();
const fleetRoutingController = require("../controllers/fleetRoutingController");

router.post("/optimize", fleetRoutingController.optimizeFleet);
router.get("/", function (req, res) {
	res.send("Fleet Routing API");
});

module.exports = router;
