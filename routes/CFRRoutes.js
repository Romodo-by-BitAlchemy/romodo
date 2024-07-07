const express = require("express");
const CFRController = require("../controllers/CFRController");
const {
	validateWorkspaceCreation,
	validateVehicleCreation,
	validateShipmentCreation,
	validateOptimizerCreation,
} = require("../middlewares/CFRResourceMiddleware");

const router = express.Router();

// Workspace operations
router.post(
	"/workspace",
	validateWorkspaceCreation,
	CFRController.createWorkspace
);

// Vehicle operations
router.post(
	"/workspace/:workspaceId/vehicle",
	validateVehicleCreation,
	CFRController.createVehicle
);
router.patch(
	"/workspace/:workspaceId/vehicle/:vehicleId",
	validateVehicleCreation,
	CFRController.updateVehicle
);
router.delete(
	"/workspace/:workspaceId/vehicle/:vehicleId",
	CFRController.deleteVehicle
);

// Shipment operations
router.post(
	"/workspace/:workspaceId/shipment",
	validateShipmentCreation,
	CFRController.createShipment
);

// Optimizer operations
router.post(
	"/workspace/:workspaceId/optimizer",
	validateOptimizerCreation,
	CFRController.createOptimizer
);
router.post(
	"/workspace/:workspaceId/optimizer/:optimizerId/run",
	CFRController.runOptimizer
);
router.get("/workspace/:workspaceId/optimizers", CFRController.listOptimizers);

module.exports = router;
