const axios = require("axios");
const { execSync } = require("child_process");
const winston = require("../utils/logger");

class CFRResource {
	constructor(projectId) {
		this.projectId = projectId || 390204966554;
	}

	generateAccessToken() {
		return execSync("gcloud auth print-access-token").toString().trim();
	}

	async createWorkspace(workspaceDisplayName) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		if (
			typeof workspaceDisplayName !== "string" ||
			workspaceDisplayName.trim() === ""
		) {
			console.error(
				"Invalid workspaceDisplayName. It must be a non-empty string."
			);
			return;
		}

		const body = {
			displayName: workspaceDisplayName.trim(),
		};

		try {
			const response = await axios.post(url, body, { headers });
			console.log("Workspace created:", response.data);
			winston.info("Workspace created:", JSON.stringify(response.data));
			return response.data;
		} catch (error) {
			this.handleError(error, "creating workspace");
		}
	}

	async getWorkspace(workspaceId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.get(url, { headers });
			console.log("Workspace details:", response.data);
			winston.info("Workspace details:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "getting workspace");
		}
	}

	async updateWorkspace(workspaceId, workspaceDisplayName) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		if (
			typeof workspaceDisplayName !== "string" ||
			workspaceDisplayName.trim() === ""
		) {
			console.error(
				"Invalid workspaceDisplayName. It must be a non-empty string."
			);
			return;
		}

		const body = {
			displayName: workspaceDisplayName.trim(),
		};

		try {
			const response = await axios.patch(url, body, { headers });
			console.log("Workspace updated:", response.data);
			winston.info("Workspace updated:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "updating workspace");
		}
	}

	async deleteWorkspace(workspaceId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.delete(url, { headers });
			console.log("Workspace deleted:", response.data);
			winston.info("Workspace deleted:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "deleting workspace");
		}
	}

	async createShipment(workspaceId, shipmentData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		try {
			const response = await axios.post(url, shipmentData, { headers });
			console.log("Shipment created:", response.data);
			winston.info("Shipment created:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "creating shipment");
		}
	}

	async getShipment(workspaceId, shipmentId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.get(url, { headers });
			console.log("Shipment details:", response.data);
			winston.info("Shipment details:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "getting shipment");
		}
	}

	async updateShipment(workspaceId, shipmentId, shipmentData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		try {
			const response = await axios.patch(url, shipmentData, { headers });
			console.log("Shipment updated:", response.data);
			winston.info("Shipment updated:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "updating shipment");
		}
	}

	async deleteShipment(workspaceId, shipmentId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.delete(url, { headers });
			console.log("Shipment deleted:", response.data);
			winston.info("Shipment deleted:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "deleting shipment");
		}
	}

	async createVehicle(workspaceId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		try {
			const response = await axios.post(url, vehicleData, { headers });
			console.log("Vehicle created:", response.data);
			winston.info("Vehicle created:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "creating vehicle");
		}
	}

	async getVehicle(workspaceId, vehicleId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.get(url, { headers });
			console.log("Vehicle details:", response.data);
			winston.info("Vehicle details:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "getting vehicle");
		}
	}

	async updateVehicle(workspaceId, vehicleId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};

		try {
			const response = await axios.patch(url, vehicleData, { headers });
			console.log("Vehicle updated:", response.data);
			winston.info("Vehicle updated:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "updating vehicle");
		}
	}

	async deleteVehicle(workspaceId, vehicleId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		const headers = {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
		};

		try {
			const response = await axios.delete(url, { headers });
			console.log("Vehicle deleted:", response.data);
			winston.info("Vehicle deleted:", response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, "deleting vehicle");
		}
	}

	handleError(error, action) {
		if (error.response) {
			console.error(`Error ${action}:`, error.response.data);
			winston.error(`Error ${action}:`, error.response.data);
		} else if (error.request) {
			console.error(`Error ${action}: No response received`, error.request);
			winston.error(`Error ${action}: No response received`, error.request);
		} else {
			console.error(`Error ${action}:`, error.message);
			winston.error(`Error ${action}:`, error.message);
		}
	}
}

module.exports = { CFRResource };
