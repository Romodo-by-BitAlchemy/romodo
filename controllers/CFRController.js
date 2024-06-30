const express = require("express");
const {
	setUpResourceManager,
	extractWorkspaceId,
	extractShipmentId,
	extractVehicleId,
} = require("../middlewares/CFRResourceMiddleware");

const router = express.Router();

// Workspace operations
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

// Vehicle operations
router.get(
	"/workspace/:workspaceId/vehicles",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		try {
			const vehicles = await req.resourceManager.getVehicles(workspaceId);
			res.status(200).json(vehicles);
		} catch (error) {
			res.status(500).json({ error: "Error fetching vehicles" });
		}
	}
);

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

router.delete(
	"/workspace/:workspaceId/vehicle/:vehicleId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, vehicleId } = req.params;
		try {
			await req.resourceManager.deleteVehicle(workspaceId, vehicleId);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: "Error deleting vehicle" });
		}
	}
);

// Shipment operations
router.get(
	"/workspace/:workspaceId/shipments",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		try {
			const shipments = await req.resourceManager.getShipments(workspaceId);
			res.status(200).json(shipments);
		} catch (error) {
			res.status(500).json({ error: "Error fetching shipments" });
		}
	}
);

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

router.patch(
	"/workspace/:workspaceId/shipment/:shipmentId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, shipmentId } = req.params;
		const shipmentData = req.body;
		try {
			const shipmentResponse = await req.resourceManager.updateShipment(
				workspaceId,
				shipmentId,
				shipmentData
			);
			res.status(200).json(shipmentResponse);
		} catch (error) {
			res.status(500).json({ error: "Error updating shipment" });
		}
	}
);

router.delete(
	"/workspace/:workspaceId/shipment/:shipmentId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, shipmentId } = req.params;
		try {
			await req.resourceManager.deleteShipment(workspaceId, shipmentId);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: "Error deleting shipment" });
		}
	}
);

// Optimizer operations
router.get(
	"/workspace/:workspaceId/optimizers",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		try {
			const optimizers = await req.resourceManager.getOptimizers(workspaceId);
			res.status(200).json(optimizers);
		} catch (error) {
			res.status(500).json({ error: "Error fetching optimizers" });
		}
	}
);

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

router.patch(
	"/workspace/:workspaceId/optimizer/:optimizerId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, optimizerId } = req.params;
		const optimizerData = req.body;
		try {
			const optimizerResponse = await req.resourceManager.updateOptimizer(
				workspaceId,
				optimizerId,
				optimizerData
			);
			res.status(200).json(optimizerResponse);
		} catch (error) {
			res.status(500).json({ error: "Error updating optimizer" });
		}
	}
);

router.delete(
	"/workspace/:workspaceId/optimizer/:optimizerId",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId, optimizerId } = req.params;
		try {
			await req.resourceManager.deleteOptimizer(workspaceId, optimizerId);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: "Error deleting optimizer" });
		}
	}
);

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

// Operations and Solutions
router.get(
	"/workspace/:workspaceId/operations",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		try {
			const operations = await req.resourceManager.getOperations(workspaceId);
			res.status(200).json(operations);
		} catch (error) {
			res.status(500).json({ error: "Error fetching operations" });
		}
	}
);

router.get(
	"/workspace/:workspaceId/solutions",
	setUpResourceManager,
	async (req, res) => {
		const { workspaceId } = req.params;
		try {
			const solutions = await req.resourceManager.getSolutions(workspaceId);
			res.status(200).json(solutions);
		} catch (error) {
			res.status(500).json({ error: "Error fetching solutions" });
		}
	}
);

module.exports = router;
