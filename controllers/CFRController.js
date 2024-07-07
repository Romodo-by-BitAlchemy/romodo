const CFRService = require("../services/CFRService");
const logger = require("../utils/logger");

class CFRController {
	async createWorkspace(req, res) {
		try {
			const { workspaceDisplayName } = req.body;
			const workspaceData = await CFRService.createWorkspace(
				workspaceDisplayName
			);
			res.status(201).json(workspaceData);
		} catch (error) {
			logger.error("Error creating workspace:", error);
			res.status(500).json({ error: "Error creating workspace" });
		}
	}

	async createVehicle(req, res) {
		try {
			const { workspaceId } = req.params;
			const vehicleData = req.body;
			const vehicleResponse = await CFRService.createVehicle(
				workspaceId,
				vehicleData
			);
			res.status(201).json(vehicleResponse);
		} catch (error) {
			logger.error("Error creating vehicle:", error);
			res.status(500).json({ error: "Error creating vehicle" });
		}
	}

	async updateVehicle(req, res) {
		try {
			const { workspaceId, vehicleId } = req.params;
			const vehicleData = req.body;
			const vehicleResponse = await CFRService.updateVehicle(
				workspaceId,
				vehicleId,
				vehicleData
			);
			res.status(200).json(vehicleResponse);
		} catch (error) {
			logger.error("Error updating vehicle:", error);
			res.status(500).json({ error: "Error updating vehicle" });
		}
	}

	async deleteVehicle(req, res) {
		try {
			const { workspaceId, vehicleId } = req.params;
			await CFRService.deleteVehicle(workspaceId, vehicleId);
			res.status(204).send();
		} catch (error) {
			logger.error("Error deleting vehicle:", error);
			res.status(500).json({ error: "Error deleting vehicle" });
		}
	}

	async createShipment(req, res) {
		try {
			const { workspaceId } = req.params;
			const shipmentData = req.body;
			const shipmentResponse = await CFRService.createShipment(
				workspaceId,
				shipmentData
			);
			res.status(201).json(shipmentResponse);
		} catch (error) {
			logger.error("Error creating shipment:", error);
			res.status(500).json({ error: "Error creating shipment" });
		}
	}

	async createOptimizer(req, res) {
		try {
			const { workspaceId } = req.params;
			const optimizerData = req.body;
			const optimizerResponse = await CFRService.createOptimizer(
				workspaceId,
				optimizerData
			);
			res.status(201).json(optimizerResponse);
		} catch (error) {
			logger.error("Error creating optimizer:", error);
			res.status(500).json({ error: "Error creating optimizer" });
		}
	}

	async runOptimizer(req, res) {
		try {
			const { workspaceId, optimizerId } = req.params;
			const optimizationResponse = await CFRService.runOptimizer(
				workspaceId,
				optimizerId
			);
			res.status(200).json(optimizationResponse);
		} catch (error) {
			logger.error("Error running optimizer:", error);
			res.status(500).json({ error: "Error running optimizer" });
		}
	}

	async listOptimizers(req, res) {
		try {
			const { workspaceId } = req.params;
			const optimizers = await CFRService.listOptimizers(workspaceId);
			res.status(200).json(optimizers);
		} catch (error) {
			logger.error("Error fetching optimizers:", error);
			res.status(500).json({ error: "Error fetching optimizers" });
		}
	}

	// Add other controller methods as needed
}

module.exports = new CFRController();
