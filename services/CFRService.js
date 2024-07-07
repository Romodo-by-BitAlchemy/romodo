const axios = require("axios");
const { execSync } = require("child_process");
const config = require("../config/config");
const logger = require("../utils/logger");

class CFRService {
	constructor() {
		this.projectId = config.projectId;
		this.projectName = config.projectName;
		this.location = config.location;
	}

	generateAccessToken() {
		return execSync("gcloud auth print-access-token").toString().trim();
	}

	getHeaders() {
		return {
			Authorization: `Bearer ${this.generateAccessToken()}`,
			"x-goog-user-project": this.projectId,
			"Content-Type": "application/json; charset=utf-8",
			Accept: "application/json",
		};
	}

	async makeRequest(method, url, data, action) {
		const headers = this.getHeaders();
		let axiosConfig = { method, url, headers };

		if (method.toLowerCase() !== "get" && data) {
			axiosConfig.data = data;
			const contentLength = Buffer.byteLength(JSON.stringify(data));
			headers["Content-Length"] = contentLength.toString();
		}

		try {
			const response = await axios(axiosConfig);
			logger.info(`${action} successful:`, response.data);
			return response.data;
		} catch (error) {
			logger.error(`Error ${action}:`, error.response?.data || error.message);
			throw error;
		}
	}

	async createWorkspace(workspaceDisplayName) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces`;
		const body = { displayName: workspaceDisplayName };
		return await this.makeRequest("post", url, body, "creating workspace");
	}

	async createVehicle(workspaceId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/vehicles`;
		return await this.makeRequest("post", url, vehicleData, "creating vehicle");
	}

	async createShipment(workspaceId, shipmentData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/shipments`;
		return await this.makeRequest(
			"post",
			url,
			shipmentData,
			"creating shipment"
		);
	}

	async createOptimizer(workspaceId, optimizerData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/optimizers`;
		return await this.makeRequest(
			"post",
			url,
			optimizerData,
			"creating optimizer"
		);
	}

	async runOptimizer(workspaceId, optimizerId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/optimizers/${optimizerId}:run`;
		return await this.makeRequest("post", url, {}, "running optimizer");
	}

	async listOptimizers(workspaceId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/optimizers?pageSize=10`;
		return await this.makeRequest("get", url, null, "listing optimizers");
	}

	async getOperation(operationId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/operations/${operationId}`;
		return await this.makeRequest("get", url, null, "getting operation");
	}

	async getSolution(solutionName) {
		const url = `https://cloudoptimization.googleapis.com/v1/${solutionName}`;
		return await this.makeRequest("get", url, null, "getting solution");
	}

	async updateVehicle(workspaceId, vehicleId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		return await this.makeRequest(
			"patch",
			url,
			vehicleData,
			"updating vehicle"
		);
	}

	async deleteVehicle(workspaceId, vehicleId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/workspaces/${workspaceId}/vehicles/${vehicleId}`;
		return await this.makeRequest("delete", url, null, "deleting vehicle");
	}

	// Add other methods as needed (getVehicles, getShipments, updateShipment, deleteShipment, etc.)
}

module.exports = new CFRService();
