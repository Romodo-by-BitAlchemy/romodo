const axios = require("axios");
const { execSync } = require("child_process");
const winston = require("../utils/logger");

class CFRResource {
	constructor(projectName = "romodo-fleets", projectId = 390204966554) {
		this.projectId = projectId;
		this.projectName = projectName;

		//// Uncomment this in case of gcloud authentication issues

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
			Accept: "application/json",
		};
	}

	prepareAxiosConfig(method, url, data) {
		const headers = this.getHeaders();
		let axiosConfig = { method, url, headers };

		if (method.toLowerCase() !== "get" && data) {
			axiosConfig.data = data;
			const contentLength = Buffer.byteLength(JSON.stringify(data));
			headers["Content-Length"] = contentLength.toString();
			console.log(`Setting Content-Length to ${contentLength}`);
		} else {
			delete headers["Content-Length"];
			console.log("Removing Content-Length header");
		}

		return axiosConfig;
	}

	handleRequestError(error, action) {
		console.error(`Error ${action}:`, {
			message: error.message,
			status: error.response?.status,
			data: error.response?.data,
			headers: error.response?.headers,
			config: error.config,
		});
		throw error;
	}

	async makeRequest(method, url, data, action) {
		const axiosConfig = this.prepareAxiosConfig(method, url, data);

		console.log(
			"Initial headers:",
			JSON.stringify(axiosConfig.headers, null, 2)
		);
		console.log(`Sending ${method.toUpperCase()} request to ${url}`);
		console.log("Final headers:", JSON.stringify(axiosConfig.headers, null, 2));
		if (axiosConfig.data) {
			console.log("Data:", JSON.stringify(axiosConfig.data, null, 2));
		}

		try {
			const response = await axios(axiosConfig);
			console.log(`${action} successful:`, response.data);
			return response.data;
		} catch (error) {
			this.handleRequestError(error, action);
		}
	}

	// async reoptimize(workspaceId, reoptimizationRequest) {
	// 	const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}:reoptimize`;
	// 	return await this.makeRequest(
	// 		"post",
	// 		url,
	// 		reoptimizationRequest,
	// 		"reoptimizing"
	// 	);
	// }

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
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces`;
		const body = { displayName: workspaceDisplayName };
		return await this.makeRequest("post", url, body, "creating workspace");
	}

	async createVehicle(workspaceId, vehicleData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/vehicles`;
		return await this.makeRequest("post", url, vehicleData, "creating vehicle");
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

	async createOptimizer(workspaceId, optimizerData) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/optimizers`;
		return await this.makeRequest(
			"post",
			url,
			optimizerData,
			"creating optimizer"
		);
	}

	async runOptimizer(workspaceId, optimizerId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/optimizers/${optimizerId}:run`;
		return await this.makeRequest("post", url, {}, "running optimizer");
	}

	async listOptimizers(workspaceId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/workspaces/${workspaceId}/optimizers?pageSize=10`;
		return await this.makeRequest("get", url, null, "listing optimizers");
	}

	async getOperation(operationId) {
		const url = `https://cloudoptimization.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/operations/${operationId}`;
		console.log(url);
		return await this.makeRequest("get", url, null, "getting operation");
	}

	async getSolution(solutionName) {
		const url = `https://cloudoptimization.googleapis.com/v1/${solutionName}`;
		console.log("Solution URL:", url);
		return await this.makeRequest("get", url, null, "getting solution");
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
