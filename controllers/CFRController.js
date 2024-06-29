const express = require("express");
const {
	setUpResourceManager,
	extractWorkspaceId,
	extractShipmentId,
	extractVehicleId,
} = require("../middlewares/CFRResourceMiddleware");

const router = express.Router();

router.post("/workspace", setUpResourceManager, async (req, res) => {
	const { workspaceDisplayName } = req.body;
	try {
		const workspaceData = await req.resourceManager.createWorkspace(
			workspaceDisplayName
		);
		res.status(201).json(workspaceData);
	} catch (error) {
		res.status(500).json({ error: "Error creating workspace" });
	}
});

// Create a new vehicle
router.post(
	"/workspace/:workspaceId/vehicle",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		const vehicleData = req.body;
		try {
			const vehicleResponse = await req.resourceManager.createVehicle(
				workspaceId,
				vehicleData
			);
			res.status(201).json(vehicleResponse);
		} catch (error) {
			res.status(500).json({ error: "Error creating vehicle" });
		}
	}
);

// Create a new shipment
router.post(
	"/workspace/:workspaceId/shipment",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		const shipmentData = req.body;
		try {
			const shipmentResponse = await req.resourceManager.createShipment(
				workspaceId,
				shipmentData
			);
			res.status(201).json(shipmentResponse);
		} catch (error) {
			res.status(500).json({ error: "Error creating shipment" });
		}
	}
);

// Create a new optimizer
router.post(
	"/workspace/:workspaceId/optimizer",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		const optimizerData = req.body;
		try {
			const optimizerResponse = await req.resourceManager.createOptimizer(
				workspaceId,
				optimizerData
			);
			res.status(201).json(optimizerResponse);
		} catch (error) {
			res.status(500).json({ error: "Error creating optimizer" });
		}
	}
);

// Run optimizer
router.post(
	"/workspace/:workspaceId/optimizer/:optimizerId/run",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, optimizerId } = req.params;
		try {
			const optimizationResponse = await req.resourceManager.runOptimizer(
				workspaceId,
				optimizerId
			);
			res.status(200).json(optimizationResponse);
		} catch (error) {
			res.status(500).json({ error: "Error running optimizer" });
		}
	}
);

// Update vehicle (for route commitments)
router.patch(
	"/workspace/:workspaceId/vehicle/:vehicleId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, vehicleId } = req.params;
		const vehicleData = req.body;
		try {
			const vehicleResponse = await req.resourceManager.updateVehicle(
				workspaceId,
				vehicleId,
				vehicleData
			);
			res.status(200).json(vehicleResponse);
		} catch (error) {
			res.status(500).json({ error: "Error updating vehicle" });
		}
	}
);

module.exports = router;
