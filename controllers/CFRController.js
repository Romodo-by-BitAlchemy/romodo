const express = require("express");
const {
	setUpResourceManager,
	extractWorkspaceId,
	extractShipmentId,
	extractVehicleId,
} = require("../middlewares/CFRResourceMiddleware");

const router = express.Router();

// Create a new workspace
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

// Get workspace details
router.get(
	"/workspace/:projectId/:workspaceId",
	[setUpResourceManager, extractWorkspaceId],
	async (req, res) => {
		try {
			const workspaceData = await req.resourceManager.getWorkspace(
				req.workspaceId
			);
			res.status(200).json(workspaceData);
		} catch (error) {
			res.status(500).json({ error: "Error getting workspace" });
		}
	}
);

// Update workspace
router.patch(
	"/workspace/:projectId/:workspaceId",
	[setUpResourceManager, extractWorkspaceId],
	async (req, res) => {
		const { workspaceDisplayName } = req.body;
		try {
			const workspaceData = await req.resourceManager.updateWorkspace(
				req.workspaceId,
				workspaceDisplayName
			);
			res.status(200).json(workspaceData);
		} catch (error) {
			res.status(500).json({ error: "Error updating workspace" });
		}
	}
);

// Delete workspace
router.delete(
	"/workspace/:projectId/:workspaceId",
	[setUpResourceManager, extractWorkspaceId],
	async (req, res) => {
		try {
			const workspaceData = await req.resourceManager.deleteWorkspace(
				req.workspaceId
			);
			res.status(200).json(workspaceData);
		} catch (error) {
			res.status(500).json({ error: "Error deleting workspace" });
		}
	}
);

// Create a new shipment
router.post(
	"/workspace/:projectId/:workspaceId/shipment",
	[setUpResourceManager, extractWorkspaceId],
	async (req, res) => {
		const shipmentData = req.body;
		try {
			const shipmentResponse = await req.resourceManager.createShipment(
				req.workspaceId,
				shipmentData
			);
			res.status(201).json(shipmentResponse);
		} catch (error) {
			res.status(500).json({ error: "Error creating shipment" });
		}
	}
);

// Get shipment details
router.get(
	"/workspace/:projectId/:workspaceId/shipment/:shipmentId",
	[setUpResourceManager, extractWorkspaceId, extractShipmentId],
	async (req, res) => {
		try {
			const shipmentData = await req.resourceManager.getShipment(
				req.workspaceId,
				req.shipmentId
			);
			res.status(200).json(shipmentData);
		} catch (error) {
			res.status(500).json({ error: "Error getting shipment" });
		}
	}
);

// Update shipment
router.patch(
	"/workspace/:projectId/:workspaceId/shipment/:shipmentId",
	[setUpResourceManager, extractWorkspaceId, extractShipmentId],
	async (req, res) => {
		const shipmentData = req.body;
		try {
			const shipmentResponse = await req.resourceManager.updateShipment(
				req.workspaceId,
				req.shipmentId,
				shipmentData
			);
			res.status(200).json(shipmentResponse);
		} catch (error) {
			res.status(500).json({ error: "Error updating shipment" });
		}
	}
);

// Delete shipment
router.delete(
	"/workspace/:projectId/:workspaceId/shipment/:shipmentId",
	[setUpResourceManager, extractWorkspaceId, extractShipmentId],
	async (req, res) => {
		try {
			const shipmentResponse = await req.resourceManager.deleteShipment(
				req.workspaceId,
				req.shipmentId
			);
			res.status(200).json(shipmentResponse);
		} catch (error) {
			res.status(500).json({ error: "Error deleting shipment" });
		}
	}
);

// Create a new vehicle
router.post(
	"/workspace/:projectId/:workspaceId/vehicle",
	[setUpResourceManager, extractWorkspaceId],
	async (req, res) => {
		const vehicleData = req.body;
		try {
			const vehicleResponse = await req.resourceManager.createVehicle(
				req.workspaceId,
				vehicleData
			);
			res.status(201).json(vehicleResponse);
		} catch (error) {
			res.status(500).json({ error: "Error creating vehicle" });
		}
	}
);

// Get vehicle details
router.get(
	"/workspace/:projectId/:workspaceId/vehicle/:vehicleId",
	[setUpResourceManager, extractWorkspaceId, extractVehicleId],
	async (req, res) => {
		try {
			const vehicleData = await req.resourceManager.getVehicle(
				req.workspaceId,
				req.vehicleId
			);
			res.status(200).json(vehicleData);
		} catch (error) {
			res.status(500).json({ error: "Error getting vehicle" });
		}
	}
);

// Update vehicle
router.patch(
	"/workspace/:projectId/:workspaceId/vehicle/:vehicleId",
	[setUpResourceManager, extractWorkspaceId, extractVehicleId],
	async (req, res) => {
		const vehicleData = req.body;
		try {
			const vehicleResponse = await req.resourceManager.updateVehicle(
				req.workspaceId,
				req.vehicleId,
				vehicleData
			);
			res.status(200).json(vehicleResponse);
		} catch (error) {
			res.status(500).json({ error: "Error updating vehicle" });
		}
	}
);

// Delete vehicle
router.delete(
	"/workspace/:projectId/:workspaceId/vehicle/:vehicleId",
	[setUpResourceManager, extractWorkspaceId, extractVehicleId],
	async (req, res) => {
		try {
			const vehicleResponse = await req.resourceManager.deleteVehicle(
				req.workspaceId,
				req.vehicleId
			);
			res.status(200).json(vehicleResponse);
		} catch (error) {
			res.status(500).json({ error: "Error deleting vehicle" });
		}
	}
);

module.exports = router;
