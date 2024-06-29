const axios = require("axios");
const { execSync } = require("child_process");
const winston = require("../utils/logger");

class CFRResource {
	constructor(projectName = "romodo-fleets", projectId = 390204966554) {
		this.projectId = projectId;
		this.projectName = projectName;
		// console.log(execSync("gcloud auth list").toString());
		// execSync(
		// 	`gcloud auth application-default login\ngcloud config set project ${this.projectName}\ngcloud auth application-default set-quota-project ${projectName}`
		// );
	}

	generateAccessToken() {
		return execSync("gcloud auth print-access-token").toString().trim();
	}

	getHeaders() {
		return {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
		};
	}

	async makeRequest(method, url, data, action) {
		const headers = this.getHeaders();
		try {
			const response = await axios({ method, url, headers, data });
			console.log(`${action} successful:`, response.data);
			winston.info(`${action} successful:`, response.data);
			return response.data;
		} catch (error) {
			this.handleError(error, action);
		}
	}

	validateDisplayName(workspaceDisplayName) {
		if (
			typeof workspaceDisplayName !== "string" ||
			workspaceDisplayName.trim() === ""
		) {
			throw new Error(
				"Invalid workspaceDisplayName. It must be a non-empty string."
			);
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

	async createWorkspace(workspaceDisplayName) {
		try {
			this.validateDisplayName(workspaceDisplayName);
			const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces`;
			const body = { displayName: workspaceDisplayName.trim() };
			return await this.makeRequest("post", url, body, "creating workspace");
		} catch (error) {
			console.error(error.message);
		}
	}

	async getWorkspace() {
		try {
			const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces`;
			return await this.makeRequest("get", url, null, null);
		} catch (error) {
			console.error(error.message);
		}
	}

	async updateWorkspace(workspaceId, workspaceDisplayName) {
		try {
			this.validateDisplayName(workspaceDisplayName);
			const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}`;
			const body = { displayName: workspaceDisplayName.trim() };
			return await this.makeRequest("patch", url, body, "updating workspace");
		} catch (error) {
			console.error(error.message);
		}
	}

	async deleteWorkspace(workspaceId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}`;
		return await this.makeRequest("delete", url, null, "deleting workspace");
	}

	async createShipment(workspaceId, shipmentData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments`;
		return await this.makeRequest(
			"post",
			url,
			shipmentData,
			"creating shipment"
		);
	}

	async getShipment(workspaceId, shipmentId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		return await this.makeRequest("get", url, null, "getting shipment");
	}

	async updateShipment(workspaceId, shipmentId, shipmentData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		return await this.makeRequest(
			"patch",
			url,
			shipmentData,
			"updating shipment"
		);
	}

	async deleteShipment(workspaceId, shipmentId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/shipments/${shipmentId}`;
		return await this.makeRequest("delete", url, null, "deleting shipment");
	}

	async createVehicle(workspaceId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles`;
		return await this.makeRequest("post", url, vehicleData, "creating vehicle");
	}

	async getVehicle(workspaceId, vehicleId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		return await this.makeRequest("get", url, null, "getting vehicle");
	}

	async updateVehicle(workspaceId, vehicleId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		return await this.makeRequest(
			"patch",
			url,
			vehicleData,
			"updating vehicle"
		);
	}

	async deleteVehicle(workspaceId, vehicleId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		return await this.makeRequest("delete", url, null, "deleting vehicle");
	}
}

module.exports = { CFRResource };
